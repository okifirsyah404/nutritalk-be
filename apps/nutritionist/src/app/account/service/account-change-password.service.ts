import {
	AuthErrorMessage,
	OtpErrorMessage,
	SignatureErrorMessage,
} from "@constant/message";
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
import { MailQueueService } from "@nutritionist/module/queue/service/mail-queue.service";
import { OtpPurpose } from "@prisma/client";
import { AccountChangePasswordRepository } from "../repository/account-change-password.repository";

@Injectable()
export class AccountChangePasswordService {
	constructor(
		private readonly repository: AccountChangePasswordRepository,
		private readonly otpService: OtpService,
		private readonly mailQueueService: MailQueueService,
		private readonly signatureService: SignatureService,
	) {}

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

	async verifyOtp(reqData: IOtpVerifyRequest): Promise<IOtpVerifyResponse> {
		const validateResult = await this.otpService.validateOtp({
			email: reqData.email,
			purpose: OtpPurpose.ACCOUNT_CHANGE_PASSWORD,
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

	async changePassword(
		account: IAccountEntity,
		reqData: IChangePasswordRequest,
	): Promise<IAccountEntity> {
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

		const updatedAccount = await this.repository.updatePassword(
			account.id,
			reqData.password,
		);

		return updatedAccount;
	}
}
