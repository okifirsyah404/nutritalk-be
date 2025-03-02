import { FirebaseAuthService } from "@config/firebase";
import { SSOErrorMessage } from "@constant/message";
import { IAccountEntity, IGoogleSSORequest } from "@contract";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { NutritionistAccountSSORepository } from "../repository/nutritionist-account-sso.repository";

@Injectable()
export class NutritionistAccountSSOService {
	constructor(
		private readonly repostory: NutritionistAccountSSORepository,
		private readonly firebaseAuth: FirebaseAuthService,
	) {}

	private readonly logger = new Logger(NutritionistAccountSSOService.name);

	/**
	 * Binds a Google SSO account to the given account.
	 *
	 * @param account - The account entity to bind the Google SSO account to.
	 * @param data - The request data containing the Google JWT token.
	 * @returns A promise that resolves to the updated account entity.
	 * @throws {BadRequestException} If the Google SSO account already exists.
	 */
	async bindGoogleSSO(
		account: IAccountEntity,
		data: IGoogleSSORequest,
	): Promise<IAccountEntity> {
		const googleUser = await this.firebaseAuth.getUserByIdToken(
			data.googleJwtToken,
		);

		const userSSO = await this.repostory.findSSOByGoogleId(googleUser.uid);

		if (userSSO) {
			if (userSSO.googleSSO) {
				throw new BadRequestException(
					SSOErrorMessage.ERR_SSO_GOOGLE_ALREADY_TAKEN,
				);
			}
		}

		if (!userSSO) {
			await this.repostory.createSSO(account.id);
		}

		await this.repostory.createGoogleSSO(account.id, {
			email: googleUser.email || "",
			googleId: googleUser.uid,
		});

		return this.repostory.updateEmail(account.id, googleUser.email);
	}
}
