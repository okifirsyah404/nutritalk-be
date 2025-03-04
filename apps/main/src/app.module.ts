import { QueueModule } from "@app/module/queue/queue.module";
import { HttpThrottleGuard } from "@common";
import { AppCacheModule } from "@config/app-cache";
import { AppConfigModule, AppConfigService } from "@config/app-config";
import { FirebaseModule } from "@config/firebase";
import { PrismaModule } from "@config/prisma";
import { S3StorageModule } from "@config/s3storage";
import { FirebaseServicePath } from "@constant/path/main/firebase-service-path";
import { MailerModule } from "@module/mailer";
import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { Logger, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { seconds, ThrottlerModule } from "@nestjs/throttler";
import { UtilityModule } from "@util";
import { AdminModule } from "./app/admin/admin.module";
import { HealthCheckModule } from "./app/health-check/health-check.module";
import { NutritionistAppModule } from "./app/nutritionist/nutritionist.app.module";
import { PatientAppModule } from "./app/patient/patient.app.module";
import { CommonAppModule } from "./app/common/common.app.module";

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
				new Logger().log(
					`SMTP Config: ${JSON.stringify(appConfig.smtpConfig)}`,
				);

				return {
					smtpOptions: {
						host: appConfig.smtpConfig.host,
						port: appConfig.smtpConfig.port,
						secure: appConfig.smtpConfig.secure,
						auth: {
							user: appConfig.smtpConfig.user,
							pass: appConfig.smtpConfig.password,
						},
					},
					maxRetryAttempts: 3,
				};
			},
		}),
		FirebaseModule.forRoot({
			credential: FirebaseServicePath.FIREBASE_SERVICE_FILE_PATH,
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

		PatientAppModule,
		NutritionistAppModule,
		AdminModule,
		HealthCheckModule,
		CommonAppModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: HttpThrottleGuard,
		},
	],
})
export class AppModule {}
