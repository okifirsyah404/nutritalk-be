import { AppConfigModule, AppConfigService } from '@config/app-config';
import { PrismaModule } from '@database/prisma';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { redisStore } from 'cache-manager-redis-store';
import { AccessTokenStrategy } from './infrastructure/strategy/access-token.strategy';
import { RefreshTokenStrategy } from './infrastructure/strategy/refresh-token.strategy';
import { AppJwtService } from './provider/app-jwt.service';
import { AppJwtRepository } from './repository/app-jwt.repository';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        secret: config.jwtConfig.accessTokenSecret,
        signOptions: { expiresIn: config.jwtConfig.accessTokenExpiresIn },
      }),
    }),
    CacheModule.registerAsync({
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
