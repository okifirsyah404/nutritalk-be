import { AppCacheModule } from "@config/app-cache";
import { AppConfigModule, AppConfigService } from "@config/app-config";
import { PrismaModule } from "@config/prisma";
import { S3StorageModule } from "@config/s3storage";
import { MailerModule } from "@module/mailer";
import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ThrottlerModule, seconds } from "@nestjs/throttler";
import { QueueModule } from "@nutritionist/module/queue/queue.module";
import { UtilityModule } from "@util";

@Module({
	imports: [
		AppConfigModule,
		AppCacheModule,
		PrismaModule.forRoot({
			logs: false,
		}),
		ThrottlerModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [AppConfigService],
			useFactory: (appConfig: AppConfigService) => [
				{
					limit: appConfig.throttleConfig.limit,
					ttl: seconds(appConfig.throttleConfig.ttl),
					skipIf: (): boolean => !appConfig.throttleConfig.enable,
				},
			],
		}),
		S3StorageModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [AppConfigService],
			useFactory: (appConfig: AppConfigService) => {
				const s3Config = appConfig.s3Config;

				return {
					s3Options: {
						accessKeyId: s3Config.accessKeyId,
						secretAccessKey: s3Config.secretAccessKey,
						bucketName: s3Config.bucketName,
						endPoint: s3Config.endPoint,
						region: s3Config.region,
					},
				};
			},
		}),
		MailerModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [AppConfigService],
			isGlobal: true,
			useFactory: (appConfig: AppConfigService) => {
				return {
					smtpOptions: {
						host: appConfig.smtpConfig.host,
						port: appConfig.smtpConfig.port,
						secure: false,
						auth: {
							user: appConfig.smtpConfig.user,
							pass: appConfig.smtpConfig.password,
						},
					},
					maxRetryAttempts: 3,
				};
			},
		}),
		BullModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [AppConfigService],
			useFactory: (appConfig: AppConfigService) => ({
				redis: {
					host: appConfig.redisConfig.host,
					port: appConfig.redisConfig.port,
					db: appConfig.redisConfig.database,
				},
			}),
		}),
		QueueModule,
		UtilityModule,
		HttpModule.register({
			global: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
