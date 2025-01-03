import { AppCacheModule } from "@cache/app-cache";
import { AppConfigModule, AppConfigService } from "@config/app-config";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AccessTokenStrategy } from "./infrastructure/strategy/access-token.strategy";
import { RefreshTokenStrategy } from "./infrastructure/strategy/refresh-token.strategy";
import { AppJwtService } from "./provider/app-jwt.service";
import { AppJwtRepository } from "./repository/app-jwt.repository";

@Module({
	imports: [
		AppConfigModule,
		AppCacheModule,
		PassportModule,
		JwtModule.registerAsync({
			inject: [AppConfigService],
			useFactory: (config: AppConfigService) => ({
				secret: config.jwtConfig.accessTokenSecret,
				signOptions: { expiresIn: config.jwtConfig.accessTokenExpiresIn },
			}),
		}),
	],
	providers: [
		AppJwtService,
		AppJwtRepository,
		RefreshTokenStrategy,
		AccessTokenStrategy,
	],
	exports: [AppJwtService, RefreshTokenStrategy, AccessTokenStrategy],
})
export class AppJwtModule {}
