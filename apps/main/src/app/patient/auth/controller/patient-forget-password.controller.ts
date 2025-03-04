import { PatientAuthSendOtpRequest } from "@app/app/patient/auth/dto/request/patient-auth-send-otp.request";
import { PatientAuthVerifyOtpRequest } from "@app/app/patient/auth/dto/request/patient-auth-verify-otp.request";
import { PatientForgetPasswordRequest } from "@app/app/patient/auth/dto/request/patient-forget-password.request";
import { PatientAuthSendOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-send-otp.response";
import { PatientAuthVerifyOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-verify-otp.response";
import { PatientForgetPasswordResponse } from "@app/app/patient/auth/dto/response/patient-forget-password.response";
import { PatientForgetPasswordService } from "@app/app/patient/auth/service/patient-forget-password.service";
import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";
import { IApiResponse } from "@contract";
import { Body, Controller, Post } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";

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
	 * - data: object of email
	 *
	 */
	@Post("otp")
	async requestForgetPasswordOtp(
		@Body() reqBody: PatientAuthSendOtpRequest,
	): Promise<IApiResponse<PatientAuthSendOtpResponse>> {
		const result = await this.service.checkAccount(reqBody);

		return BaseApiResponse.created({
			message: AccountSuccessMessage.SUCCESS_SEND_OTP,
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
			message: AccountSuccessMessage.SUCCESS_VERIFY_OTP,
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
			message: AccountSuccessMessage.SUCCESS_RESET_PASSWORD,
			data: PatientForgetPasswordResponse.fromEntity(result),
		});
	}
}
