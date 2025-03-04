import { PatientAuthSSORepository } from "@app/app/patient/auth/repository/patient-auth-sso.repository";
import { ImageDownloadQueueService } from "@app/module/queue/service/image-download-queue.service";
import { AppCacheService } from "@config/app-cache";
import { AppConfigService } from "@config/app-config";
import { FirebaseAuthService } from "@config/firebase";
import { AppS3StorageService } from "@config/s3storage";
import { AccountErrorMessage } from "@constant/message";
import {
	IAuthResponse,
	IDeviceInfoEntity,
	IGoogleSSORequest,
	IGoogleUser,
	IOtpVerifyResponse,
	IPreRegisterRequest,
	IRegisterRequest,
} from "@contract";
import { AppJwtService } from "@module/app-jwt";
import { SignatureService } from "@module/signature";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { CryptoUtil, FileUtil } from "@util";

@Injectable()
export class PatientAuthSSOService {
	constructor(
		private readonly repository: PatientAuthSSORepository,
		private readonly firebaseAuth: FirebaseAuthService,
		private readonly appJwtService: AppJwtService,
		private readonly signatureService: SignatureService,
		private readonly cacheService: AppCacheService,
		private readonly s3Service: AppS3StorageService,
		private readonly cryptoUtil: CryptoUtil,
		private readonly config: AppConfigService,
		private readonly imageDownloadQueue: ImageDownloadQueueService,
	) {}

	/**
	 * Signs in a patient user with the provided Google SSO credentials.
	 *
	 * @param {IGoogleSSORequest} data - The request data containing the Google JWT token and FCM token.
	 * @returns {Promise<IAuthResponse>} A promise that resolves to an object containing the access token, refresh token, and account role.
	 * @throws {NotFoundException} If the account is not found.
	 * @throws {UnauthorizedException} If the account is not a patient.
	 */
	async signInWithGoogle(
		data: IGoogleSSORequest & Pick<IDeviceInfoEntity, "fcmToken">,
	): Promise<IAuthResponse> {
		const user = await this.firebaseAuth.getUserByIdToken(data.googleJwtToken);

		const result = await this.repository.findAccountByGoogleId(user.uid);

		if (!result) {
			throw new NotFoundException(AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		if (result.role.accountRole !== AccountRole.PATIENT) {
			throw new UnauthorizedException(
				AccountErrorMessage.ERR_ACCOUNT_NOT_PATIENT,
			);
		}

		await this.repository.updateFcmToken(result.id, data.fcmToken);

		const { accessToken, refreshToken } =
			await this.appJwtService.generateAuthTokens({
				accountId: result.id,
				userId: result.patient.id,
				role: AccountRole.PATIENT,
			});

		return {
			accessToken,
			refreshToken,
			accountRole: result.role.accountRole,
		};
	}

	/**
	 * Registers a new patient account with the provided Google SSO credentials.
	 *
	 * @param {IGoogleSSORequest} data - The request data containing the Google JWT token.
	 * @returns {Promise<IOtpVerifyResponse>} A promise that resolves to an object containing the email and signature.
	 * @throws {UnauthorizedException} If the account already exists.
	 */
	async registerWithGoogle(
		data: IGoogleSSORequest,
	): Promise<IOtpVerifyResponse> {
		const user = await this.firebaseAuth.getUserByIdToken(data.googleJwtToken);
		const result = await this.repository.findAccountByGoogleId(user.uid);

		if (result) {
			throw new UnauthorizedException(
				AccountErrorMessage.ERR_ACCOUNT_ALREADY_EXIST,
			);
		}

		const signature = await this.signatureService.generateSignature({
			sub: user.uid,
			email: user.email,
		});

		await this.cacheService.set<IGoogleUser>(
			`registerSSOGoogle:${user.email}`,
			{
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
			},
			{
				ttl: 20,
				unit: "minutes",
			},
		);

		return {
			email: user.email,
			signature,
		};
	}

	/**
	 * Pre-registers a new patient account with the provided Google SSO credentials.
	 *
	 * @param {IPreRegisterRequest} reqData - The request data containing the account details.
	 * @returns {Promise<IOtpVerifyResponse & Pick<IGoogleUser, "displayName">>} A promise that resolves to an object containing the email, display name, and signature.
	 * @throws {NotFoundException} If the account already exists.
	 */
	async preRegisterWithGoogle(
		reqData: IPreRegisterRequest,
	): Promise<IOtpVerifyResponse & Pick<IGoogleUser, "displayName">> {
		const existingAccount = await this.repository.findAccountByEmail(
			reqData.email,
		);

		if (existingAccount) {
			throw new NotFoundException(
				AccountErrorMessage.ERR_ACCOUNT_ALREADY_EXIST,
			);
		}

		await this.validateSignature(reqData.signature);

		const cachedGoogleUser = await this.cacheService.get<IGoogleUser>(
			`registerSSOGoogle:${reqData.email}`,
		);

		const signature = await this.signatureService.generateSignature({
			sub: reqData.fcmToken,
			email: reqData.email,
		});

		const hashedPassword = await this.cryptoUtil.hash(
			reqData.password,
			this.config.bcryptConfig.saltRounds,
		);

		await this.cacheService.set<IPreRegisterRequest>(
			`preRegisterSSOGoogle:${reqData.email}:${signature}`,
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
			displayName: cachedGoogleUser.displayName,
			signature,
		};
	}

	/**
	 * Completes the registration process for a new patient account with the provided Google SSO credentials.
	 *
	 * @param {IRegisterRequest} reqData - The request data containing the account details.
	 * @returns {Promise<IAuthResponse>} A promise that resolves to an object containing the access token, refresh token, and account role.
	 * @throws {BadRequestException} If the signature validation fails.
	 */
	async completeRegisterWithGoogle(
		reqData: IRegisterRequest,
	): Promise<IAuthResponse> {
		await this.validateSignature(reqData.signature);

		const cachedGoogleUser = await this.cacheService.get<IGoogleUser>(
			`registerSSOGoogle:${reqData.email}`,
		);

		const preRegisterCachedData =
			await this.cacheService.get<IPreRegisterRequest>(
				`preRegisterSSOGoogle:${reqData.email}:${reqData.signature}`,
			);

		const registerPatient = await this.repository.createPatientAccount(
			{
				email: reqData.email,
				password: preRegisterCachedData.password,
				googleId: cachedGoogleUser.uid,
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
				fcmToken: preRegisterCachedData.fcmToken,
			},
		);

		void this.imageDownloadQueue.downloadImage(
			{
				url: cachedGoogleUser.photoURL,
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
			},
		);

		const { accessToken, refreshToken } =
			await this.appJwtService.generateAuthTokens({
				accountId: registerPatient.account.id,
				userId: registerPatient.id,
				role: AccountRole.PATIENT,
			});

		return {
			accessToken: accessToken,
			refreshToken: refreshToken,
			accountRole: registerPatient.account.role.accountRole,
		};
	}

	/**
	 * Validates the given signature.
	 *
	 * @param {string} signature - The signature to validate.
	 * @returns {Promise<void>} A promise that resolves if the signature is valid.
	 * @throws {BadRequestException} If the signature is invalid.
	 */
	private async validateSignature(signature: string): Promise<void> {
		const isSignatureValid = await this.signatureService.validateSignature(
			signature,
			{
				deleteAfterValidation: true,
			},
		);

		if (!isSignatureValid) {
			throw new BadRequestException(AccountErrorMessage.ERR_SIGNATURE_INVALID);
		}
	}
}
