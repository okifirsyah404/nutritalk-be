import { BaseApiResponse } from "@common";
import { AccountSuccessMessage, OtpSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { AccountChangePasswordRequest } from "../dto/request/account-change-password.request";
import { AccountOtpVerifyRequest } from "../dto/request/account-otp-verify.request";
import { AccountChangePasswordResponse } from "../dto/response/account-change-password.response";
import { AccountOtpChangePasswordResponse } from "../dto/response/account-otp-change-password.response";
import { AccountOtpVerifyChangePasswordResponse } from "../dto/response/account-otp-verify-change-password.response";
import { AccountChangePasswordService } from "../service/account-change-password.service";

@UseGuards(AccessTokenGuard)
@Controller("account/change-password")
export class AccountChangePasswordController {
	constructor(private readonly service: AccountChangePasswordService) {}

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
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<AccountOtpChangePasswordResponse>> {
		const result = await this.service.sendOtp(nutritionist);

		return BaseApiResponse.success({
			message: OtpSuccessMessage.SUCCESS_SEND_OTP,
			data: AccountOtpChangePasswordResponse.fromEntity(result),
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
		@Body() reqBody: AccountOtpVerifyRequest,
	): Promise<IApiResponse<AccountOtpVerifyChangePasswordResponse>> {
		const result = await this.service.verifyOtp(reqBody);

		return BaseApiResponse.created({
			message: OtpSuccessMessage.SUCCESS_VERIFY_OTP,
			data: AccountOtpVerifyChangePasswordResponse.fromEntity(result),
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
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: AccountChangePasswordRequest,
	): Promise<IApiResponse<AccountChangePasswordResponse>> {
		const result = await this.service.changePassword(
			nutritionist.account,
			reqBody,
		);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_CHANGE_ACCOUNT_PASSWORD,
			data: AccountChangePasswordResponse.fromEntity(result),
		});
	}
}
