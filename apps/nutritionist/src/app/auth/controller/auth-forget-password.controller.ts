import { BaseApiResponse } from "@common/response/base-api.response";
import { IApiResponse } from "@contract/response/api-response.interface";
import { IJwtSignaturePayload } from "@jwt/app-jwt";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SignatureTokenGuard } from "@sign/signature";
import GetSignaturePayload from "@sign/signature/infrastructure/decorator/get-signature-payload.decorator";
import { AuthForgetPasswordSuccessMessage } from "apps/nutritionist/src/common/constant/message/success/auth-forget-password-success.message";
import { DocsTag } from "apps/nutritionist/src/common/docs/docs";
import { AuthOperationDocs } from "../docs/auth.operation";
import { AuthForgetPasswordContent } from "../docs/content/auth-forget-password.content";
import { AuthCheckAccountRequest } from "../dto/request/auth-chcek-account.request";
import { AuthForgetPasswordRequest } from "../dto/request/auth-forget-password.request";
import { AuthOtpVerifyRequest } from "../dto/request/auth-otp-verify.request";
import { AuthForgetPasswordResponse } from "../dto/response/auth-forget-password.response";
import { AuthOtpVerifyForgetPasswordResponse } from "../dto/response/auth-otp-forget-password.response";
import { AuthForgetPasswordService } from "../service/auth-forget-password.service";

@ApiTags(DocsTag.FORGET_PASSWORD)
@Controller("auth/forget-password")
export class AuthForgetPasswordController {
	constructor(private readonly service: AuthForgetPasswordService) {}

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
	@ApiOperation(AuthOperationDocs.AUTH_REQUEST_OTP_FORGET_PASSWORD)
	@ApiBadRequestResponse({
		content:
			AuthForgetPasswordContent.AUTH_REQUEST_OTP_FORGET_PASSWORD_BAD_REQUEST,
	})
	@ApiNotFoundResponse({
		content: AuthForgetPasswordContent.AUTH_ACCOUNT_NOT_FOUND,
	})
	@ApiCreatedResponse({
		content: AuthForgetPasswordContent.AUTH_REQUEST_OTP_FORGET_PASSWORD_SUCCESS,
	})
	@Post("otp")
	async requestForgetPasswordOtp(
		@Body() reqBody: AuthCheckAccountRequest,
	): Promise<IApiResponse<AuthForgetPasswordResponse>> {
		const result = await this.service.checkAccount(reqBody);

		return BaseApiResponse.created({
			message: AuthForgetPasswordSuccessMessage.SUCCESS_SEND_OTP_TO_EMAIL,
			data: AuthForgetPasswordResponse.fromEntity(result),
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
	@ApiOperation(AuthOperationDocs.AUTH_VERIFY_OTP_FORGET_PASSWORD)
	@ApiBadRequestResponse({
		content:
			AuthForgetPasswordContent.AUTH_VERIFY_OTP_FORGET_PASSWORD_BAD_REQUEST,
	})
	@ApiCreatedResponse({
		content: AuthForgetPasswordContent.AUTH_VERIFY_OTP_FORGET_PASSWORD_SUCCESS,
	})
	@Post("otp/verify")
	async verifyForgetPasswordOtp(
		@Body() reqBody: AuthOtpVerifyRequest,
	): Promise<IApiResponse<AuthOtpVerifyForgetPasswordResponse>> {
		const result = await this.service.verifyOtp(reqBody);

		return BaseApiResponse.created({
			message: AuthForgetPasswordSuccessMessage.SUCCESS_VERIFY_OTP,
			data: AuthOtpVerifyForgetPasswordResponse.fromEntity(result),
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
	@ApiOperation(AuthOperationDocs.AUTH_RESET_PASSWORD)
	@ApiCreatedResponse({
		content: AuthForgetPasswordContent.AUTH_RESET_PASSWORD_SUCCESS,
	})
	@ApiBadRequestResponse({
		content: AuthForgetPasswordContent.AUTH_RESET_PASSWORD_BAD_REQUEST,
	})
	@ApiUnauthorizedResponse({
		content: AuthForgetPasswordContent.AUTH_RESET_PASSWORD_UNAUTHORIZED,
	})
	@ApiNotFoundResponse({
		content: AuthForgetPasswordContent.AUTH_ACCOUNT_NOT_FOUND,
	})
	@UseGuards(SignatureTokenGuard)
	@Post()
	async resetPassword(
		@Body() reqBody: AuthForgetPasswordRequest,
		@GetSignaturePayload() signaturePayload: IJwtSignaturePayload,
	): Promise<IApiResponse<AuthForgetPasswordResponse>> {
		const result = await this.service.resetPassword({
			email: signaturePayload.email,
			reqData: reqBody,
		});

		return BaseApiResponse.created({
			message: AuthForgetPasswordSuccessMessage.SUCCESS_RESET_PASSWORD,
			data: AuthForgetPasswordResponse.fromEntity(result),
		});
	}
}
