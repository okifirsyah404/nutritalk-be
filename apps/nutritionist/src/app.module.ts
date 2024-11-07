import { AppCacheModule } from '@cache/app-cache';
import { AppConfigModule, AppConfigService } from '@config/app-config';
import { PrismaModule } from '@database/prisma';
import { MailerModule } from '@mail/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { S3StorageModule } from '@s3storage/s3storage';
import { AuthModule } from './app/auth/auth.module';
import { ProfileModule } from './app/profile/profile.module';
import { QueueModule } from './module/queue/queue.module';
import { DashboardModule } from './app/dashboard/dashboard.module';
import { AccountModule } from './app/account/account.module';
import { PriceModule } from './app/price/price.module';
import { ScheduleModule } from './app/schedule/schedule.module';

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

    // Routes
    AuthModule,
    ProfileModule,
    DashboardModule,
    AccountModule,
    PriceModule,
    ScheduleModule,
  ],
})
export class NutritionistModule {}
