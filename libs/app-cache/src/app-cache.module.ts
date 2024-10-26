import { AppConfigModule, AppConfigService } from '@config/app-config';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-ioredis-yet';
import momment from 'moment';
import { AppCacheService } from './provider/app-cache.service';

@Global()
@Module({
  imports: [
    AppConfigModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfig: AppConfigService) => {
        const ttl = momment
          .duration(appConfig.redisConfig.ttl, 'seconds')
          .asMilliseconds();

        const store = await redisStore({
          socket: {
            host: appConfig.redisConfig.host,
            port: appConfig.redisConfig.port,
          },
          db: appConfig.redisConfig.database,
          ttl,
        });

        return {
          store: store as unknown as CacheStore,
          ttl,
        };
      },
    }),
  ],
  providers: [AppCacheService],
  exports: [AppCacheService],
})
export class AppCacheModule {}
