import { FirebaseAuthService } from "@config/firebase";
import { AccountErrorMessage } from "@constant/message";
import { IAuthResponse, IGoogleSSORequest } from "@contract";
import { IDeviceInfoEntity } from "@contract/entities/device-info.entity.interface";
import { AppJwtService } from "@module/app-jwt";
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { NutritionistAuthSSORepository } from "../repository/nutritionist-auth-sso.repository";

@Injectable()
export class NutritionistAuthSSOService {
	constructor(
		private readonly repository: NutritionistAuthSSORepository,
		private readonly firebaseAuth: FirebaseAuthService,
		private readonly appJwtService: AppJwtService,
	) {}

	/**
	 * Signs in a nutritionist user with the provided Google SSO credentials.
	 *
	 * @param {IGoogleSSORequest} data - The request data containing the Google JWT token and FCM token.
	 * @returns {Promise<IAuthResponse>} A promise that resolves to an object containing the access token, refresh token, and account role.
	 * @throws {NotFoundException} If the account is not found.
	 * @throws {UnauthorizedException} If the account is not a nutritionist.
	 */
	async signInWithGoogle(
		data: IGoogleSSORequest & Pick<IDeviceInfoEntity, "fcmToken">,
	): Promise<IAuthResponse> {
		const user = await this.firebaseAuth.getUserByIdToken(data.googleJwtToken);

		const result = await this.repository.findAccountByGoogleId(user.uid);

		if (!result) {
			throw new NotFoundException(AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		if (result.role.accountRole !== AccountRole.NUTRITIONIST) {
			throw new UnauthorizedException(
				AccountErrorMessage.ERR_ACCOUNT_NOT_NUTRITIONIST,
			);
		}

		await this.repository.updateFcmToken(result.id, data.fcmToken);

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
}
