import { BaseApiResponse } from "@common";
import { AccountSuccessMessage } from "@constant/message";
import { IApiResponse, IJwtRefresh, INutritionistEntity } from "@contract";
import {
	AccessTokenGuard,
	GetNutritionistLogged,
	RefreshToken,
	RefreshTokenGuard,
} from "@module/app-jwt";
import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistAuthRefreshTokenRequest } from "../dto/request/nutritionist-auth-refresh-token.request";
import { NutritionistAuthSignInRequest } from "../dto/request/nutritionist-auth-sign-in.request";
import { NutritionistAuthResponse } from "../dto/response/nutritionist-auth.response";
import { NutritionistAuthService } from "../service/nutritionist-auth.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "auth"))
export class NutritionistAuthController {
	constructor(private readonly service: NutritionistAuthService) {}

	/**
	 *
	 * Http endpoint for signing up a nutritionist.
	 *
	 * Request body:
	 * - email: (required) string
	 * - password: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of accessToken and refreshToken
	 *
	 */
	@Post("sign-in")
	async signIn(
		@Body() reqBody: NutritionistAuthSignInRequest,
	): Promise<IApiResponse<NutritionistAuthResponse>> {
		const result = await this.service.signIn(reqBody);

		return BaseApiResponse.created({
			message: AccountSuccessMessage.SUCCESS_AUTH_SIGN_IN,
			data: NutritionistAuthResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for refreshing the access token.
	 *
	 * Request header:
	 * - x-refresh-token: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of accessToken and refreshToken
	 *
	 */
	@Post("refresh-token")
	@UseGuards(RefreshTokenGuard)
	async getRefreshToken(
		@RefreshToken() refreshToken: IJwtRefresh,
		@Body() reqBody: NutritionistAuthRefreshTokenRequest,
	): Promise<IApiResponse<NutritionistAuthResponse>> {
		const result = await this.service.refreshToken(refreshToken, reqBody);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_AUTH_REFRESH_TOKEN,
			data: NutritionistAuthResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Http endpoint for signing out a user.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: undefined
	 *
	 */
	@UseGuards(AccessTokenGuard)
	@Delete("sign-out")
	async signOut(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<undefined>> {
		await this.service.signOut(nutritionist.account.id);

		return BaseApiResponse.success({
			message: AccountSuccessMessage.SUCCESS_AUTH_SIGN_OUT,
			data: undefined,
		});
	}
}
