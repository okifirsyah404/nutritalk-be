import { Body, Controller, Logger, Post } from "@nestjs/common";
import { UriUtil } from "@util";
import { AccountRole } from "@prisma/client";
import { PatientAuthRegisterService } from "@app/app/patient/auth/service/patient-auth-register.service";
import { IApiResponse } from "@contract";
import { BaseApiResponse } from "@common";
import { OtpSuccessMessage } from "@constant/message";
import { PatientAuthSendOtpRequest } from "@app/app/patient/auth/dto/request/patient-auth-send-otp.request";
import { PatientAuthSendOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-send-otp.response";
import { PatientAuthVerifyOtpRequest } from "@app/app/patient/auth/dto/request/patient-auth-verify-otp.request";
import { PatientAuthVerifyOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-verify-otp.response";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "auth/sign-up"))
export class PatientAuthRegisterController {
	constructor(private readonly service: PatientAuthRegisterService) {}

	private readonly logger = new Logger(PatientAuthRegisterController.name);

	/**
	 *
	 * Http endpoint for requesting an OTP to register.
	 *
	 * Request body:
	 * - email: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of email
	 *
	 */
	@Post("otp")
	async requestRegisterOtp(
		@Body() reqBody: PatientAuthSendOtpRequest,
	): Promise<IApiResponse<PatientAuthSendOtpResponse>> {
		this.logger.log(`Requesting OTP for email: ${reqBody.email}`);

		const result = await this.service.checkAccount(reqBody);

		return BaseApiResponse.created({
			message: OtpSuccessMessage.SUCCESS_SEND_OTP,
			data: PatientAuthSendOtpResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for verifying the OTP to register.
	 *
	 * Request body:
	 * - email: (required) string
	 * - otp: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of signature
	 *
	 */
	@Post("otp/verify")
	async verifyRegisterOtp(
		@Body() reqBody: PatientAuthVerifyOtpRequest,
	): Promise<IApiResponse<PatientAuthVerifyOtpResponse>> {
		const result = await this.service.verifyOtp(reqBody);

		return BaseApiResponse.created({
			message: OtpSuccessMessage.SUCCESS_VERIFY_OTP,
			data: PatientAuthVerifyOtpResponse.fromEntity(result),
		});
	}
}
