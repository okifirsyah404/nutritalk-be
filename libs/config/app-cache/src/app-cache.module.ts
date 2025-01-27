import { AppConfigModule, AppConfigService } from "@config/app-config";
import KeyvRedis from "@keyv/redis";
import { CacheModule } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import Keyv from "keyv";
import moment from "moment";
import { AppCacheService } from "./provider/app-cache.service";

@Global()
@Module({
	imports: [
		AppConfigModule,
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [AppConfigModule],
			inject: [AppConfigService],
			useFactory: (appConfig: AppConfigService) => {
				const ttl = moment
					.duration(appConfig.redisConfig.ttl, "seconds")
					.asMilliseconds();

				return {
					stores: [
						new Keyv({
							store: new KeyvRedis({
								socket: {
									host: appConfig.redisConfig.host,
									port: appConfig.redisConfig.port,
								},
							}),
						}),
					],
					ttl,
				};
			},
		}),
	],
	providers: [AppCacheService],
	exports: [AppCacheService],
})
export class AppCacheModule {}
