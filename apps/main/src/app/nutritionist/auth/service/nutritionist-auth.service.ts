import { AccountErrorMessage } from "@constant/message";
import {
	IAccountEntity,
	IAuthResponse,
	IDeviceInfoEntity,
	IJwtRefresh,
} from "@contract";
import { AppJwtService } from "@module/app-jwt";
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { CryptoUtil } from "@util";
import { NutritionistAuthRepository } from "../repository/nutritionist-auth.repository";

@Injectable()
export class NutritionistAuthService {
	constructor(
		private readonly repository: NutritionistAuthRepository,
		private readonly appJwtService: AppJwtService,
		private readonly cryptoUtil: CryptoUtil,
	) {}

	/**
	 * Signs in a nutritionist user with the provided credentials.
	 *
	 * @param {AuthSignInRequest} reqData - The request data containing email, password, and FCM token.
	 * @returns {Promise<IJwtToken>} A promise that resolves to an object containing the access token and refresh token.
	 * @throws {NotFoundException} If the account is not found.
	 * @throws {UnauthorizedException} If the account is not a nutritionist or if the password does not match.
	 */
	async signIn(
		reqData: Pick<IAccountEntity, "email" | "password"> &
			Pick<IDeviceInfoEntity, "fcmToken">,
	): Promise<IAuthResponse> {
		const result = await this.repository.findAccountByEmail(reqData.email);

		if (!result) {
			throw new NotFoundException(AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		if (result.role.accountRole !== AccountRole.NUTRITIONIST) {
			throw new UnauthorizedException(
				AccountErrorMessage.ERR_ACCOUNT_NOT_NUTRITIONIST,
			);
		}

		const isPasswordMatch = this.cryptoUtil.compareSync(
			reqData.password,
			result.password,
		);

		if (!isPasswordMatch) {
			throw new UnauthorizedException(
				AccountErrorMessage.ERR_PASSWORD_NOT_MATCH,
			);
		}

		await this.repository.updateFcmToken(result.id, reqData.fcmToken);

		const { accessToken, refreshToken } =
			await this.appJwtService.generateAuthTokens({
				accountId: result.id,
				userId: result.nutritionist.id,
				role: AccountRole.NUTRITIONIST,
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
		reqData: Pick<IDeviceInfoEntity, "fcmToken">,
	): Promise<IAuthResponse> {
		const nutritionistAccount = await this.repository.findAccountById(
			token.payload.accountId,
		);

		const { accessToken, refreshToken } =
			await this.appJwtService.generateAuthTokens({
				accountId: token.payload.accountId,
				userId: nutritionistAccount.nutritionist.id,
				role: AccountRole.NUTRITIONIST,
			});

		void this.repository.updateFcmToken(
			nutritionistAccount.id,
			reqData.fcmToken,
		);

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

		if (!account.deviceInfo.fcmToken && !account.refreshToken) {
			throw new UnauthorizedException(
				AccountErrorMessage.ERR_ACCOUNT_ALREADY_SIGN_OUT,
			);
		}

		await this.appJwtService.deleteRefreshToken(id);

		await this.repository.updateFcmToken(id, null);
	}
}
