import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";
import { IApiResponse } from "@contract";
import { Body, Controller, Post } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistForgetPasswordSendOtpRequest } from "../dto/request/nutritionist-forget-password-send-otp.request";
import { NutritionistForgetPasswordVerifyOtpRequest } from "../dto/request/nutritionist-forget-password-verify-otp.request";
import { NutritionistForgetPasswordRequest } from "../dto/request/nutritionist-forget-password.request";
import { NutritionistForgetPasswordSendOtpResponse } from "../dto/response/nutritionist-forget-password-send-otp.response";
import { NutritionistForgetPasswordVerifyOtpResponse } from "../dto/response/nutritionist-forget-password-verify-otp.response";
import { NutritionistForgetPasswordResponse } from "../dto/response/nutritionist-forget-password.response";
import { NutritionistForgetPasswordService } from "../service/nutritionist-forget-password.service";
@Controller(
	UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "auth/forget-password"),
)
export class NutritionistForgetPasswordController {
	constructor(private readonly service: NutritionistForgetPasswordService) {}

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
		@Body() reqBody: NutritionistForgetPasswordSendOtpRequest,
	): Promise<IApiResponse<NutritionistForgetPasswordSendOtpResponse>> {
		const result = await this.service.checkAccount(reqBody);

		return BaseApiResponse.created({
			message: AccountSuccessMessage.SUCCESS_SEND_OTP,
			data: NutritionistForgetPasswordSendOtpResponse.fromEntity(result),
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
		@Body() reqBody: NutritionistForgetPasswordVerifyOtpRequest,
	): Promise<IApiResponse<NutritionistForgetPasswordVerifyOtpResponse>> {
		const result = await this.service.verifyOtp(reqBody);

		return BaseApiResponse.created({
			message: AccountSuccessMessage.SUCCESS_VERIFY_OTP,
			data: NutritionistForgetPasswordVerifyOtpResponse.fromEntity(result),
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
		@Body() reqBody: NutritionistForgetPasswordRequest,
	): Promise<IApiResponse<NutritionistForgetPasswordResponse>> {
		const result = await this.service.resetPassword({
			reqData: reqBody,
		});

		return BaseApiResponse.created({
			message: AccountSuccessMessage.SUCCESS_RESET_PASSWORD,
			data: NutritionistForgetPasswordResponse.fromEntity(result),
		});
	}
}
