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
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { seconds, ThrottlerModule } from "@nestjs/throttler";
import { UtilityModule } from "@util";
import { AccountModule } from "./app/account/account.module";
import { AuthModule } from "./app/auth/auth.module";
import { CertificateModule } from "./app/certificate/certificate.module";
import { DashboardModule } from "./app/dashboard/dashboard.module";
import { HealthCheckModule } from "./app/health-check/health-check.module";
import { PriceModule } from "./app/price/price.module";
import { ProfileModule } from "./app/profile/profile.module";
import { ScheduleModule } from "./app/schedule/schedule.module";
import { QueueModule } from "./module/queue/queue.module";
import { NutritionistModule } from './app/nutritionist/nutritionist.module';
import { OccupationModule } from './app/occupation/occupation.module';
import { PatientModule } from './app/patient/patient.module';

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

		// Routes
		AuthModule,
		ProfileModule,
		DashboardModule,
		AccountModule,
		PriceModule,
		ScheduleModule,
		HealthCheckModule,
		CertificateModule,
		NutritionistModule,
		OccupationModule,
		PatientModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: HttpThrottleGuard,
		},
	],
})
export class AppModule {}
