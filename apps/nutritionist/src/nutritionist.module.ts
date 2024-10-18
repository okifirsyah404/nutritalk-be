import { AppConfigModule, AppConfigService } from '@config/app-config';
import { PrismaModule } from '@database/prisma';
import { MailerModule } from '@mail/mailer';
import { BullModule } from '@nestjs/bull';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { S3StorageModule } from '@s3storage/s3storage';
import { redisStore } from 'cache-manager-redis-store';
import { AuthModule } from './app/auth/auth.module';
import { NutritionistController } from './app/nutritionist.controller';
import { ProfileModule } from './app/profile/profile.module';
import { QueueModule } from './module/queue/queue.module';

@Module({
  imports: [
    AppConfigModule,
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
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfig: AppConfigService) => {
        const store = await redisStore({
          socket: {
            host: appConfig.redisConfig.host,
            port: appConfig.redisConfig.port,
          },
          ttl: appConfig.redisConfig.ttl,
        });

        return {
          store: store as unknown as CacheStore,
          ttl: appConfig.redisConfig.ttl * 1000,
        };
      },
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
        },
      }),
    }),
    QueueModule,

    // Routes
    AuthModule,
    ProfileModule,
  ],
  controllers: [NutritionistController],
  providers: [],
})
export class NutritionistModule {}
