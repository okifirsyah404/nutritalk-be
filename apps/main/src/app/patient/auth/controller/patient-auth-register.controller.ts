import { PatientAuthPreRegisterRequest } from "@app/app/patient/auth/dto/request/patient-auth-pre-register.request";
import { PatientAuthRegisterRequest } from "@app/app/patient/auth/dto/request/patient-auth-register.request";
import { PatientAuthSendOtpRequest } from "@app/app/patient/auth/dto/request/patient-auth-send-otp.request";
import { PatientAuthVerifyOtpRequest } from "@app/app/patient/auth/dto/request/patient-auth-verify-otp.request";
import { PatientAuthSendOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-send-otp.response";
import { PatientAuthVerifyOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-verify-otp.response";
import { PatientAuthResponse } from "@app/app/patient/auth/dto/response/patient-auth.response";
import { PatientAuthRegisterService } from "@app/app/patient/auth/service/patient-auth-register.service";
import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";
import { IApiResponse } from "@contract";
import { Body, Controller, Logger, Post } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";

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
			message: AccountSuccessMessage.SUCCESS_SEND_OTP,
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
			message: AccountSuccessMessage.SUCCESS_VERIFY_OTP,
			data: PatientAuthVerifyOtpResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for pre-registering an account.
	 *
	 * Request body:
	 * - email: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of signature
	 *
	 */
	@Post("pre-register")
	async preRegister(
		@Body() reqBody: PatientAuthPreRegisterRequest,
	): Promise<IApiResponse<PatientAuthVerifyOtpResponse>> {
		const result = await this.service.preRegisterAccount(reqBody);

		return BaseApiResponse.created({
			message: AccountSuccessMessage.SUCCESS_AUTH_SIGN_UP_CACHED,
			data: PatientAuthVerifyOtpResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for registering an account.
	 *
	 * Request body:
	 * - email: (required) string
	 * - password: (required) string
	 * - otp: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of PatientAuthResponse
	 *
	 */
	@Post()
	async register(
		@Body() reqBody: PatientAuthRegisterRequest,
	): Promise<IApiResponse<PatientAuthResponse>> {
		const result = await this.service.register(reqBody);

		return BaseApiResponse.created({
			message: AccountSuccessMessage.SUCCESS_AUTH_SIGN_UP,
			data: PatientAuthResponse.fromEntity(result),
		});
	}
}
