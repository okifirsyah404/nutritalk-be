import { AppCacheModule } from "@config/app-cache";
import { AppConfigModule, AppConfigService } from "@config/app-config";
import { FirebaseModule } from "@config/firebase";
import { PrismaModule } from "@config/prisma";
import { S3StorageModule } from "@config/s3storage";
import { FirebaseServicePath } from "@constant/path/main/firebase-service-path";
import { MailerModule } from "@module/mailer";
import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { UtilityModule } from "@util";
import { OtpSchedulerModule } from "./app/otp-scheduler/otp-scheduler.module";
import { ScheduleService } from "./schedule/schedule.service";
import { SignatureSchedulerModule } from "./app/signature-scheduler/signature-scheduler.module";
import { AutoAvailableSchedulerModule } from './app/auto-available-scheduler/auto-available-scheduler.module';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		AppConfigModule,
		AppCacheModule,
		PrismaModule.forRoot({
			logs: false,
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
		UtilityModule,
		HttpModule.register({
			global: true,
		}),

		// App Modules
		OtpSchedulerModule,
		SignatureSchedulerModule,
		AutoAvailableSchedulerModule,
	],
	providers: [ScheduleService],
})
export class AppModule {}
