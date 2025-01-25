import { AppConfigService } from "@config/app-config";
import {
	IJwtAccessPayload,
	INutritionistEntity,
	IPatientEntity,
} from "@contract";
import { AppJwtService } from "@module/app-jwt/provider/app-jwt.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AccountRole } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
/**
 * Strategy for validating access tokens using Passport.
 */
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly config: AppConfigService,
		private readonly service: AppJwtService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.jwtConfig.accessTokenSecret,
		});
	}

	/**
	 * Validates the payload of the access token.
	 * @param payload - The payload of the access token.
	 * @returns The validated payload.
	 */

	async validate(
		payload: IJwtAccessPayload,
	): Promise<INutritionistEntity | IPatientEntity> {
		let user: INutritionistEntity | IPatientEntity;

		switch (payload.role) {
			case AccountRole.NUTRITIONIST:
				user = await this._validateNutritionist(payload.sub);
				break;
			case AccountRole.PATIENT:
				user = await this._validatePatient(payload.sub);
				break;
			default:
				throw new UnauthorizedException("User not found");
		}

		return user;
	}

	private async _validateNutritionist(
		id: string,
	): Promise<INutritionistEntity> {
		const nutritionist = await this.service.getNutritionistById(id);

		if (!nutritionist) {
			throw new UnauthorizedException("Nutritionist not found");
		}
		return nutritionist;
	}

	private async _validatePatient(id: string): Promise<IPatientEntity> {
		const patient = await this.service.getPatientById(id);

		if (!patient) {
			throw new UnauthorizedException("Patient not found");
		}

		return patient;
	}
}
