import { BaseApiResponse } from "@common";
import { AccountSuccessMessage, OtpSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { SignatureTokenGuard } from "@module/signature";
import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistChangePasswordVerifyOtpRequest } from "../dto/request/nutritionist-change-password-verify-otp.request";
import { NutritionistChangePasswordRequest } from "../dto/request/nutritionist-change-password.request";
import { NutritionistChangePasswordSendOtpResponse } from "../dto/response/nutritionist-change-password-send-otp.response";
import { NutritionistChangePasswordVerifyOtpResponse } from "../dto/response/nutritionist-change-password-verify-otp.response";
import { NutritionistChangePasswordResponse } from "../dto/response/nutritionist-change-password.response";
import { NutritionistChangePasswordService } from "../service/nutritionist-change-password.service";

@UseGuards(AccessTokenGuard)
@Controller(
	UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "account/change-password"),
)
export class NutritionistChangePasswordController {
	constructor(private readonly service: NutritionistChangePasswordService) {}

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
	): Promise<IApiResponse<NutritionistChangePasswordSendOtpResponse>> {
		const result = await this.service.sendOtp(nutritionist);

		return BaseApiResponse.success({
			message: OtpSuccessMessage.SUCCESS_SEND_OTP,
			data: NutritionistChangePasswordSendOtpResponse.fromEntity(result),
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
		@Body() reqBody: NutritionistChangePasswordVerifyOtpRequest,
	): Promise<IApiResponse<NutritionistChangePasswordVerifyOtpResponse>> {
		const result = await this.service.verifyOtp(reqBody);

		return BaseApiResponse.created({
			message: OtpSuccessMessage.SUCCESS_VERIFY_OTP,
			data: NutritionistChangePasswordVerifyOtpResponse.fromEntity(result),
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
	@UseGuards(SignatureTokenGuard)
	@Put()
	async changePassword(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: NutritionistChangePasswordRequest,
	): Promise<IApiResponse<NutritionistChangePasswordResponse>> {
		const result = await this.service.changePassword(
			nutritionist.account,
			reqBody,
		);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_CHANGE_ACCOUNT_PASSWORD,
			data: NutritionistChangePasswordResponse.fromEntity(result),
		});
	}
}
