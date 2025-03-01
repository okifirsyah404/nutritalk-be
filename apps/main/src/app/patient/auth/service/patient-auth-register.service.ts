import { PatientAuthRegisterRepository } from "@app/app/patient/auth/repository/patient-auth-register.repository";
import { DiceBearQueueService } from "@app/module/queue/service/dice-bear-queue.service";
import { ImageDownloadQueueService } from "@app/module/queue/service/image-download-queue.service";
import { MailQueueService } from "@app/module/queue/service/mail-queue.service";
import { AppCacheService } from "@config/app-cache";
import { AppConfigService } from "@config/app-config";
import { AppS3StorageService } from "@config/s3storage";
import {
	AccountErrorMessage,
	OtpErrorMessage,
	SignatureErrorMessage,
} from "@constant/message";
import {
	IAuthResponse,
	IOtpEmail,
	IOtpResponse,
	IOtpVerifyRequest,
	IOtpVerifyResponse,
	IPreRegisterRequest,
	IRegisterRequest,
} from "@contract";
import { AppJwtService } from "@module/app-jwt";
import { OtpService } from "@module/otp";
import { SignatureService } from "@module/signature";
import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from "@nestjs/common";
import { AccountRole, OtpPurpose } from "@prisma/client";
import { CryptoUtil, FileUtil } from "@util";

@Injectable()
export class PatientAuthRegisterService {
	constructor(
		private readonly repository: PatientAuthRegisterRepository,
		private readonly otpService: OtpService,
		private readonly mailQueueService: MailQueueService,
		private readonly diceBearQueueService: DiceBearQueueService,
		private readonly imageDownloadQueue: ImageDownloadQueueService,
		private readonly signatureService: SignatureService,
		private readonly cryptoUtil: CryptoUtil,
		private readonly config: AppConfigService,
		private readonly appJwtService: AppJwtService,
		private readonly cacheService: AppCacheService,
		private readonly s3Service: AppS3StorageService,
	) {}

	private readonly logger = new Logger(PatientAuthRegisterService.name);

	/**
	 * Checks if an account exists for the given email and generates an OTP for register.
	 *
	 * @param {IOtpEmail} reqData - The request data containing the email to check.
	 * @returns {Promise<IOtpEmail>} - A promise that resolves to an object containing the email.
	 *
	 * @throws {NotFoundException} - If no account is found for the given email.
	 */
	async checkAccount(reqData: IOtpEmail): Promise<IOtpResponse> {
		const result = await this.repository.findAccountByEmail(reqData.email);

		if (result) {
			throw new NotFoundException(
				AccountErrorMessage.ERR_ACCOUNT_ALREADY_EXIST,
			);
		}

		const otpResult = await this.otpService.generateOtp({
			email: reqData.email,
			length: 6,
			purpose: OtpPurpose.AUTH_REGISTER,
		});

		void this.mailQueueService.sendOtpMail({
			to: reqData.email,
			subject: "Register OTP",
			body: {
				recipientName: reqData.email,
				otpCode: otpResult.code,
				purpose: OtpPurpose.AUTH_REGISTER,
				minutes: otpResult.expiry.minutes,
			},
		});

		return {
			email: otpResult.email,
			expiryAt: otpResult.expiryAt,
		};
	}

	/**
	 * Verifies the OTP (One-Time Password) for the register process.
	 *
	 * @param {IOtpVerifyRequest} reqData - The request data containing the email and OTP.
	 * @returns A promise that resolves to an object containing the email and a generated signature.
	 * @throws {BadRequestException} If the OTP validation fails.
	 */
	async verifyOtp(reqData: IOtpVerifyRequest): Promise<IOtpVerifyResponse> {
		const validateResult = await this.otpService.validateOtp({
			email: reqData.email,
			purpose: OtpPurpose.AUTH_REGISTER,
			code: reqData.otp,
			deleteAfterValidation: true,
		});

		if (!validateResult) {
			throw new BadRequestException(OtpErrorMessage.ERR_OTP_INVALID);
		}

		const signature = await this.signatureService.generateSignature({
			sub: reqData.otp,
			email: reqData.email,
		});

		return {
			email: reqData.email,
			signature,
		};
	}

	async preRegisterAccount(
		reqData: IPreRegisterRequest,
	): Promise<IOtpVerifyResponse> {
		const existingAccount = await this.repository.findAccountByEmail(
			reqData.email,
		);

		if (existingAccount) {
			throw new NotFoundException(
				AccountErrorMessage.ERR_ACCOUNT_ALREADY_EXIST,
			);
		}

		const isSignatureValid = await this.signatureService.validateSignature(
			reqData.signature,
			{
				deleteAfterValidation: true,
			},
		);

		if (!isSignatureValid) {
			throw new BadRequestException(
				SignatureErrorMessage.ERR_SIGNATURE_INVALID,
			);
		}

		const signature = await this.signatureService.generateSignature({
			sub: reqData.fcmToken,
			email: reqData.email,
		});

		const hashedPassword = await this.cryptoUtil.hash(
			reqData.password,
			this.config.bcryptConfig.saltRounds,
		);

		await this.cacheService.set<IPreRegisterRequest>(
			`register:${reqData.email}:${signature}`,
			{
				...reqData,
				password: hashedPassword,
				confirmPassword: hashedPassword,
			},
			{
				ttl: 20,
				unit: "minutes",
			},
		);

		return {
			email: reqData.email,
			signature,
		};
	}

	async register(reqData: IRegisterRequest): Promise<IAuthResponse> {
		const isSignatureValid = await this.signatureService.validateSignature(
			reqData.signature,
			{
				deleteAfterValidation: true,
			},
		);

		if (!isSignatureValid) {
			throw new BadRequestException(
				SignatureErrorMessage.ERR_SIGNATURE_INVALID,
			);
		}

		const cachedData: IPreRegisterRequest = await this.cacheService.get(
			`register:${reqData.email}:${reqData.signature}`,
		);

		const registerPatient = await this.repository.createPatientAccount(
			{
				email: reqData.email,
				password: cachedData.password,
			},
			{
				name: reqData.name,
				gender: reqData.gender,
				phoneNumber: reqData.phoneNumber,
				address: reqData.address,
				placeOfBirth: reqData.placeOfBirth,
				dateOfBirth: reqData.dateOfBirth,
				bio: reqData.bio,
			},
			{
				fcmToken: cachedData.fcmToken,
			},
		);

		await this.cacheService.delete(
			`register:${reqData.email}:${reqData.signature}`,
		);

		const { accessToken, refreshToken } =
			await this.appJwtService.generateAuthTokens({
				accountId: registerPatient.account.id,
				userId: registerPatient.id,
				role: AccountRole.PATIENT,
			});

		// void this.diceBearQueueService.generateImage(
		// 	{
		// 		seed: registerPatient.profile.name ?? "Patient",
		// 		key: registerPatient.id,
		// 	},
		// 	async (result) => {
		// 		const res = await this.s3Service.uploadFileFromPath({
		// 			seed: registerPatient.id,
		// 			role: AccountRole.PATIENT,
		// 			filePath: result.path,
		// 		});

		// 		await this.repository.updateImageKey(registerPatient.id, res);

		// 		await FileUtil.deleteTempFile(result.path);
		// 	},
		// );

		void this.imageDownloadQueue.downloadImage(
			{
				url: `${this.config.diceBearConfig.url}&seed=${registerPatient.profile.name}`,
				seed: registerPatient.id,
			},
			async (result) => {
				const res = await this.s3Service.uploadFileFromPath({
					seed: registerPatient.id,
					role: AccountRole.PATIENT,
					filePath: result,
				});

				await this.repository.updateImageKey(registerPatient.id, res);

				await FileUtil.deleteTempFile(result);
				// await this.cryptoUtil.deleteTempFile(result);
			},
		);

		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
			accountRole: registerPatient.account.role.accountRole,
		};
	}
}
