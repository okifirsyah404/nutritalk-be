import { BaseApiResponse } from "@common";
import { AccountSuccessMessage, OtpSuccessMessage } from "@constant/message";
import { IApiResponse, IPatientEntity } from "@contract";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";
import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientChangePasswordService } from "@app/app/patient/account/service/patient-change-password.service";
import { PatientChangePasswordSendOtpResponse } from "@app/app/patient/account/dto/response/patient-change-password-send-otp.response";
import { PatientChangePasswordVerifyOtpRequest } from "@app/app/patient/account/dto/request/patient-change-password-verify-otp.request";
import { PatientChangePasswordVerifyOtpResponse } from "@app/app/patient/account/dto/response/patient-change-password-verify-otp.response";
import { PatientChangePasswordRequest } from "@app/app/patient/account/dto/request/patient-change-password.request";
import { PatientChangePasswordResponse } from "@app/app/patient/account/dto/response/patient-change-password.response";

@UseGuards(AccessTokenGuard)
@Controller(
	UriUtil.uriFromRoleBase(AccountRole.PATIENT, "account/change-password"),
)
export class PatientChangePasswordController {
	constructor(private readonly service: PatientChangePasswordService) {}

	/**
	 *
	 * Http endpoint for requesting an OTP to change the password.
	 *
	 * Request body:
	 * - email: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of otp request
	 *
	 */
	@Get("otp")
	async requestChangePasswordOtp(
		@GetPatientLogged() patient: IPatientEntity,
	): Promise<IApiResponse<PatientChangePasswordSendOtpResponse>> {
		const result = await this.service.sendOtp(patient);

		return BaseApiResponse.success({
			message: OtpSuccessMessage.SUCCESS_SEND_OTP,
			data: PatientChangePasswordSendOtpResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for verifying an OTP to change the password.
	 *
	 * Request body:
	 * - email: (required) string
	 * - otp: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of otp verify response
	 *
	 */
	@Post("otp/verify")
	async verifyChangePasswordOtp(
		@Body() reqBody: PatientChangePasswordVerifyOtpRequest,
	): Promise<IApiResponse<PatientChangePasswordVerifyOtpResponse>> {
		const result = await this.service.verifyOtp(reqBody);

		return BaseApiResponse.created({
			message: OtpSuccessMessage.SUCCESS_VERIFY_OTP,
			data: PatientChangePasswordVerifyOtpResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for changing the password.
	 *
	 * Request body:
	 * - oldPassword: (required) string
	 * - newPassword: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of account change password response
	 *
	 */
	@Put()
	async changePassword(
		@GetPatientLogged() patient: IPatientEntity,
		@Body() reqBody: PatientChangePasswordRequest,
	): Promise<IApiResponse<PatientChangePasswordResponse>> {
		const result = await this.service.changePassword(patient.account, reqBody);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_CHANGE_ACCOUNT_PASSWORD,
			data: PatientChangePasswordResponse.fromEntity(result),
		});
	}
}
