import { PatientAuthPreRegisterRequest } from "@app/app/patient/auth/dto/request/patient-auth-pre-register.request";
import { PatientAuthRegisterRequest } from "@app/app/patient/auth/dto/request/patient-auth-register.request";
import { PatientAuthSsoGoogleRequest } from "@app/app/patient/auth/dto/request/patient-auth-sso-google.request";
import { PatientAuthSSOGooglePreRegisterResponse } from "@app/app/patient/auth/dto/response/patient-auth-sso-google-pre-register.response";
import { PatientAuthVerifyOtpResponse } from "@app/app/patient/auth/dto/response/patient-auth-verify-otp.response";
import { PatientAuthResponse } from "@app/app/patient/auth/dto/response/patient-auth.response";
import { PatientAuthSSOService } from "@app/app/patient/auth/service/patient-auth-sso.service";
import { BaseApiResponse } from "@common";
import { AuthSuccessMessage } from "@constant/message";
import { IApiResponse } from "@contract";
import { Body, Controller, Post } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "auth/sso"))
export class PatientAuthSSOController {
	constructor(private readonly service: PatientAuthSSOService) {}

	/**
	 *
	 * Http endpoint for signing in with Google SSO.
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
	@Post("google")
	async signInWithGoogle(
		@Body() reqBody: PatientAuthSsoGoogleRequest,
	): Promise<IApiResponse<PatientAuthResponse>> {
		const result = await this.service.signInWithGoogle(reqBody);

		return BaseApiResponse.created({
			message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_IN_WITH_GOOGLE,
			data: PatientAuthResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for signing up with Google SSO.
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
	 * - data: object of PatientAuthVerifyOtpResponse
	 *
	 */
	@Post("google/sign-up/verify")
	async registerWithGoogle(
		@Body() reqBody: PatientAuthSsoGoogleRequest,
	): Promise<IApiResponse<PatientAuthVerifyOtpResponse>> {
		const result = await this.service.registerWithGoogle(reqBody);

		return BaseApiResponse.created({
			message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_UP_WITH_GOOGLE,
			data: PatientAuthVerifyOtpResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for pre-registering with Google SSO.
	 *
	 * Request body:
	 * - email: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of PatientAuthSSOGooglePreRegisterResponse
	 *
	 */
	@Post("google/sign-up/pre-register")
	async preRegisterWithGoogle(
		@Body() reqBody: PatientAuthPreRegisterRequest,
	): Promise<IApiResponse<PatientAuthSSOGooglePreRegisterResponse>> {
		const result = await this.service.preRegisterWithGoogle(reqBody);

		return BaseApiResponse.created({
			message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_UP_CACHED,
			data: PatientAuthSSOGooglePreRegisterResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for completing registration with Google SSO.
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
	@Post("google/sign-up")
	async completeRegisterWithGoogle(
		@Body() reqBody: PatientAuthRegisterRequest,
	): Promise<IApiResponse<PatientAuthResponse>> {
		const result = await this.service.completeRegisterWithGoogle(reqBody);

		return BaseApiResponse.created({
			message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_UP,
			data: PatientAuthResponse.fromEntity(result),
		});
	}
}
