import { MailQueueService } from "@app/module/queue/service/mail-queue.service";
import {
	AccountErrorMessage,
	AuthErrorMessage,
	OtpErrorMessage,
	SignatureErrorMessage,
} from "@constant/message";
import {
	IAccountEntity,
	IChangePasswordRequest,
	IOtpEmail,
	IOtpVerifyRequest,
	IOtpVerifyResponse,
} from "@contract";
import { OtpService } from "@module/otp";
import { SignatureService } from "@module/signature";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { OtpPurpose } from "@prisma/client";
import { NutritionistForgetPasswordRepository } from "../repository/nutritionist-forget-password.repository";

@Injectable()
export class NutritionistForgetPasswordService {
	constructor(
		private readonly repository: NutritionistForgetPasswordRepository,
		private readonly otpService: OtpService,
		private readonly mailQueueService: MailQueueService,
		private readonly signatureService: SignatureService,
	) {}

	/**
	 * Checks if an account exists for the given email and generates an OTP for password recovery.
	 *
	 * @param {IOtpEmail} reqData - The request data containing the email to check.
	 * @returns {Promise<IOtpEmail>} - A promise that resolves to an object containing the email.
	 *
	 * @throws {NotFoundException} - If no account is found for the given email.
	 */
	async checkAccount(reqData: IOtpEmail): Promise<IOtpEmail> {
		const result = await this.repository.findAccountByEmail(reqData.email);

		if (!result) {
			throw new NotFoundException(AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		const otpResult = await this.otpService.generateOtp({
			email: result.email,
			length: 6,
			purpose: OtpPurpose.AUTH_FORGOT_PASSWORD,
		});

		this.mailQueueService.sendOtpMail({
			to: result.email,
			subject: "Forget Password OTP",
			body: {
				recipientName: result.email,
				otpCode: otpResult.code,
				purpose: OtpPurpose.AUTH_FORGOT_PASSWORD,
				minutes: otpResult.expiry.minutes,
			},
		});

		return {
			email: result.email,
		};
	}

	/**
	 * Verifies the OTP (One-Time Password) for the forgot password process.
	 *
	 * @param {IOtpVerifyRequest} reqData - The request data containing the email and OTP.
	 * @returns A promise that resolves to an object containing the email and a generated signature.
	 * @throws {BadRequestException} If the OTP validation fails.
	 */
	async verifyOtp(reqData: IOtpVerifyRequest): Promise<IOtpVerifyResponse> {
		const validateResult = await this.otpService.validateOtp({
			email: reqData.email,
			purpose: OtpPurpose.AUTH_FORGOT_PASSWORD,
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

	/**
	 * Resets the password for a given account.
	 *
	 * @param {Object} params - The parameters for resetting the password.
	 * @param {string} params.email - The email of the account to reset the password for.
	 * @param {AuthForgetPasswordRequest} params.reqData - The request data containing the new password and confirmation.
	 * @returns {Promise<IOtpEmail>} - A promise that resolves to an object containing the email of the account.
	 * @throws {BadRequestException} - If the new password and confirmation password do not match.
	 * @throws {NotFoundException} - If no account is found with the given email.
	 */
	async resetPassword({
		email,
		reqData,
	}: {
		email: string;
		reqData: IChangePasswordRequest;
	}): Promise<IOtpEmail> {
		if (reqData.password !== reqData.confirmPassword) {
			throw new BadRequestException(AuthErrorMessage.ERR_PASSWORD_NOT_MATCH);
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

		const account: IAccountEntity =
			await this.repository.findAccountByEmail(email);

		if (!account) {
			throw new NotFoundException(AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		await this.repository.updatePassword(account.id, reqData.password);

		return {
			email,
		};
	}
}
