import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PatientAccountSSORepository } from "@app/app/patient/account/repository/patient-account-sso.repository";
import { FirebaseAuthService } from "@config/firebase";
import { IAccountEntity, IGoogleSSORequest } from "@contract";
import { SSOErrorMessage } from "@constant/message";

@Injectable()
export class PatientAccountSSOService {
	constructor(
		private readonly repository: PatientAccountSSORepository,
		private readonly firebaseAuth: FirebaseAuthService,
	) {}

	private readonly logger = new Logger(PatientAccountSSOService.name);

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

		const userSSO = await this.repository.findSSOByGoogleId(googleUser.uid);

		if (userSSO) {
			if (userSSO.googleSSO) {
				throw new BadRequestException(
					SSOErrorMessage.ERR_SSO_GOOGLE_ALREADY_TAKEN,
				);
			}
		}

		if (!userSSO) {
			await this.repository.createSSO(account.id);
		}

		await this.repository.createGoogleSSO(account.id, {
			email: googleUser.email || "",
			googleId: googleUser.uid,
		});

		return this.repository.updateEmail(account.id, googleUser.email);
	}
}
