import { Body, Controller, Post } from "@nestjs/common";
import { PatientForgetPasswordService } from "@app/app/patient/auth/service/patient-forget-password.service";
import { UriUtil } from "@util";
import { AccountRole } from "@prisma/client";
import { PatientAuthSendOtpRequest } from "@app/app/patient/auth/dto/request/patient-auth-send-otp.request";
import { PatientAuthSendOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-send-otp.response";
import { IApiResponse } from "@contract";
import { BaseApiResponse } from "@common";
import { AuthSuccessMessage, OtpSuccessMessage } from "@constant/message";
import { PatientAuthVerifyOtpRequest } from "@app/app/patient/auth/dto/request/patient-auth-verify-otp.request";
import { PatientAuthVerifyOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-verify-otp.response";
import { PatientForgetPasswordRequest } from "@app/app/patient/auth/dto/request/patient-forget-password.request";
import { PatientForgetPasswordResponse } from "@app/app/patient/auth/dto/response/patient-forget-password.response";

@Controller(
	UriUtil.uriFromRoleBase(AccountRole.PATIENT, "auth/forget-password"),
)
export class PatientForgetPasswordController {
	constructor(private readonly service: PatientForgetPasswordService) {}

	/**
	 *
	 * Http endpoint for requesting an OTP to reset the password.
	 *
	 * Request body:
	 * - email: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of accessToken and refreshToken
	 *
	 */
	@Post("otp")
	async requestForgetPasswordOtp(
		@Body() reqBody: PatientAuthSendOtpRequest,
	): Promise<IApiResponse<PatientAuthSendOtpResponse>> {
		const result = await this.service.checkAccount(reqBody);

		return BaseApiResponse.created({
			message: OtpSuccessMessage.SUCCESS_SEND_OTP,
			data: PatientAuthSendOtpResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for verifying the OTP to reset the password.
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
	async verifyForgetPasswordOtp(
		@Body() reqBody: PatientAuthVerifyOtpRequest,
	): Promise<IApiResponse<PatientAuthVerifyOtpResponse>> {
		const result = await this.service.verifyOtp(reqBody);

		return BaseApiResponse.created({
			message: OtpSuccessMessage.SUCCESS_VERIFY_OTP,
			data: PatientAuthVerifyOtpResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for resetting the password.
	 *
	 * Request body:
	 * - password: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of email
	 *
	 */
	@Post()
	async resetPassword(
		@Body() reqBody: PatientForgetPasswordRequest,
	): Promise<IApiResponse<PatientForgetPasswordResponse>> {
		const result = await this.service.resetPassword({
			reqData: reqBody,
		});

		return BaseApiResponse.created({
			message: AuthSuccessMessage.SUCCESS_RESET_PASSWORD,
			data: PatientForgetPasswordResponse.fromEntity(result),
		});
	}
}
