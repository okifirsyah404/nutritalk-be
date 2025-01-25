import { AppConfigService } from "@config/app-config";
import { IJwtRefresh, IJwtRefreshPayload } from "@contract";
import { AppJwtService } from "@module/app-jwt/provider/app-jwt.service";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	private readonly logger = new Logger(RefreshTokenStrategy.name);

	constructor(
		private readonly appConfig: AppConfigService,
		private readonly service: AppJwtService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromHeader("x-refresh-token"),
			ignoreExpiration: false,
			secretOrKey: appConfig.jwtConfig.refreshTokenSecret,
			passReqToCallback: true,
		});
	}

	async validate(
		req: Request,
		payload: IJwtRefreshPayload,
	): Promise<IJwtRefresh> {
		const token = ExtractJwt.fromHeader("x-refresh-token")(req);

		const isValid = await this.service.validateRefreshToken(payload.sub, token);

		if (!isValid) {
			throw new UnauthorizedException("User not found");
		}

		return {
			token,
			payload,
		};
	}
}
