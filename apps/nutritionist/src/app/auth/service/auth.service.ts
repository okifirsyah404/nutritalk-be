import { AppConfigService } from "@config/app-config";

import { SetCache } from "@cache/app-cache/decorator/set-cache.decorator";
import { IAuthResponse } from "@contract/response/auth/auth-response.interface";
import { createDatabaseErrorHandler } from "@infrastructure/err_handler/database.error-handler";
import { AppJwtService, IJwtRefresh, IJwtToken } from "@jwt/app-jwt";
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { AuthRefreshTokenRequest } from "../dto/request/auth-refresh-token.request";
import { AuthSignInRequest } from "../dto/request/auth-sign-in.request";
import { AuthRepository } from "../repository/auth.repository";
import { AccountErrorMessage, AuthErrorMessage } from "@constant/constant";

@Injectable()
export class AuthService {
	constructor(
		private readonly config: AppConfigService,
		private readonly repository: AuthRepository,
		private readonly appJwtService: AppJwtService,
	) {}

	/**
	 * Signs in a nutritionist user with the provided credentials.
	 *
	 * @param {AuthSignInRequest} reqData - The request data containing email, password, and FCM token.
	 * @returns {Promise<IJwtToken>} A promise that resolves to an object containing the access token and refresh token.
	 * @throws {NotFoundException} If the account is not found.
	 * @throws {UnauthorizedException} If the account is not a nutritionist or if the password does not match.
	 */
	@SetCache<IJwtToken>(
		(reqData: AuthSignInRequest) => `auth:signin:${reqData.email}`,
		{
			ttl: 1,
			unit: "minutes",
		},
	)
	async signIn(reqData: AuthSignInRequest): Promise<IAuthResponse> {
		const result = await this.repository
			.findAccountByEmail(reqData.email)
			.catch(createDatabaseErrorHandler);

		if (!result) {
			throw new NotFoundException(AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		if (result.role.accountRole !== AccountRole.NUTRITIONIST) {
			throw new UnauthorizedException(
				AccountErrorMessage.ERR_ACCOUNT_NOT_NUTRITIONIST,
			);
		}

		const isPasswordMatch = bcrypt.compareSync(
			reqData.password,
			result.password,
		);

		if (!isPasswordMatch) {
			throw new UnauthorizedException(AuthErrorMessage.ERR_PASSWORD_NOT_MATCH);
		}

		this.repository
			.updateFcmToken(result.id, reqData.fcmToken)
			.catch(createDatabaseErrorHandler);

		const { accessToken, refreshToken } =
			await this.appJwtService.generateAuthTokens({
				sub: result.id,
				userId: result.nutritionist.id,
				role: AccountRole.NUTRITIONIST,
				email: result.email,
			});

		return {
			accessToken,
			refreshToken,
			accountRole: result.role.accountRole,
		};
	}

	/**
	 * Refreshes the authentication tokens for a nutritionist account.
	 *
	 * @param token - The JWT refresh token containing the payload with email and subject.
	 * @param reqData - The request data containing the FCM token.
	 * @returns A promise that resolves to an object containing the new access token and refresh token.
	 *
	 * @throws Will throw an error if the nutritionist account cannot be found or if token generation fails.
	 */
	async refreshToken(
		token: IJwtRefresh,
		reqData: AuthRefreshTokenRequest,
	): Promise<IAuthResponse> {
		const nutritionistAccount = await this.repository.findAccountByEmail(
			token.payload.email,
		);

		const { accessToken, refreshToken } =
			await this.appJwtService.generateAuthTokens({
				sub: token.payload.sub,
				userId: nutritionistAccount.nutritionist.id,
				role: AccountRole.NUTRITIONIST,
				email: token.payload.email,
			});

		this.repository
			.updateFcmToken(nutritionistAccount.id, reqData.fcmToken)
			.catch(createDatabaseErrorHandler);

		return {
			accessToken,
			refreshToken,
			accountRole: nutritionistAccount.role.accountRole,
		};
	}

	/**
	 * Signs out a user by deleting their refresh token and updating their FCM token to null.
	 *
	 * @param id - The unique identifier of the user to sign out.
	 * @returns A promise that resolves when the sign-out process is complete.
	 */
	async signOut(id: string): Promise<void> {
		const account = await this.repository.findAccountById(id);

		if (!account.fcmToken && !account.refreshToken) {
			throw new UnauthorizedException(
				AccountErrorMessage.ERR_ACCOUNT_ALREADY_SIGN_OUT,
			);
		}

		await this.appJwtService.deleteRefreshToken(id);

		await this.repository
			.updateFcmToken(id, null)
			.catch(createDatabaseErrorHandler);
	}
}
