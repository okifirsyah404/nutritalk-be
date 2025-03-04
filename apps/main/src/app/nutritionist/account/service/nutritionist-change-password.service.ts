import { MailQueueService } from "@app/module/queue/service/mail-queue.service";
import { AppConfigService } from "@config/app-config";
import { AccountErrorMessage } from "@constant/message";
import {
	IAccountEntity,
	IChangePasswordRequest,
	INutritionistEntity,
	IOtpResponse,
	IOtpVerifyRequest,
	IOtpVerifyResponse,
} from "@contract";
import { OtpService } from "@module/otp";
import { SignatureService } from "@module/signature";
import { BadRequestException, Injectable } from "@nestjs/common";
import { OtpPurpose } from "@prisma/client";
import { CryptoUtil } from "@util";
import { NutritionistChangePasswordRepository } from "../repository/nutritionist-change-password.repository";
@Injectable()
export class NutritionistChangePasswordService {
	constructor(
		private readonly repository: NutritionistChangePasswordRepository,
		private readonly otpService: OtpService,
		private readonly mailQueueService: MailQueueService,
		private readonly signatureService: SignatureService,
		private readonly cryptoUtil: CryptoUtil,
		private readonly config: AppConfigService,
	) {}

	/**
	 * Sends an OTP (One-Time Password) to the given nutritionist's email for the purpose of changing the account password.
	 *
	 * @param {INutritionistEntity} nutritionist - The nutritionist entity containing account and profile information.
	 * @returns {Promise<IOtpResponse>} - A promise that resolves to an object containing the email and OTP expiry information.
	 */
	async sendOtp(nutritionist: INutritionistEntity): Promise<IOtpResponse> {
		const otpResult = await this.otpService.generateOtp({
			email: nutritionist.account.email,
			length: 6,
			purpose: OtpPurpose.ACCOUNT_CHANGE_PASSWORD,
		});

		this.mailQueueService.sendOtpMail({
			to: nutritionist.account.email,
			subject: "Change Password OTP",
			body: {
				recipientName: nutritionist.profile.name,
				otpCode: otpResult.code,
				purpose: OtpPurpose.ACCOUNT_CHANGE_PASSWORD,
				minutes: otpResult.expiry.minutes,
			},
		});

		return {
			email: nutritionist.account.email,
			expiryAt: otpResult.expiryAt,
		};
	}

	/**
	 * Verifies the OTP (One-Time Password) for changing the account password.
	 *
	 * @param reqData - The request data containing the OTP and email.
	 * @returns A promise that resolves to an object containing the email and a generated signature.
	 * @throws {BadRequestException} If the OTP validation fails.
	 */
	async verifyOtp(reqData: IOtpVerifyRequest): Promise<IOtpVerifyResponse> {
		const validateResult = await this.otpService.validateOtp({
			email: reqData.email,
			purpose: OtpPurpose.ACCOUNT_CHANGE_PASSWORD,
			code: reqData.otp,
			deleteAfterValidation: true,
		});

		if (!validateResult) {
			throw new BadRequestException(AccountErrorMessage.ERR_OTP_INVALID);
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

	/**
	 * Changes the password of an account.
	 *
	 * @param {IAccountEntity} account - The account entity for which the password is to be changed.
	 * @param {IChangePasswordRequest} reqData - The request data containing the new password, confirmation password, and signature.
	 * @returns {Promise<IAccountEntity>} - A promise that resolves to the updated account entity.
	 * @throws {BadRequestException} - Throws an exception if the confirmation password does not match the new password or if the signature is invalid.
	 */
	async changePassword(
		account: IAccountEntity,
		reqData: IChangePasswordRequest,
	): Promise<IAccountEntity> {
		const isSignatureValid = await this.signatureService.validateSignature(
			reqData.signature,
			{
				deleteAfterValidation: true,
			},
		);

		if (!isSignatureValid) {
			throw new BadRequestException(AccountErrorMessage.ERR_SIGNATURE_INVALID);
		}

		const hashedPassword = await this.cryptoUtil.hash(
			reqData.password,
			this.config.bcryptConfig.saltRounds,
		);

		const updatedAccount = await this.repository.updatePassword(
			account.id,
			hashedPassword,
		);

		return updatedAccount;
	}
}
