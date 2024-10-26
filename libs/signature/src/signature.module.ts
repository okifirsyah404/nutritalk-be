import { AppConfigModule, AppConfigService } from '@config/app-config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SignatureTokenStrategy } from './infrastructure/strategy/signature-token.strategy';
import { SignatureService } from './provider/signature.service';
import { SignatureRepository } from './repository/signature.repository';

@Module({
  imports: [
    AppConfigModule,
    PassportModule.register({
      property: 'signature',
    }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService) => ({
        secret: appConfig.jwtConfig.signatureTokenSecret,
        signOptions: {
          expiresIn: appConfig.jwtConfig.signatureTokenExpiresIn,
        },
      }),
    }),
  ],
  providers: [SignatureService, SignatureRepository, SignatureTokenStrategy],
  exports: [SignatureService, SignatureTokenStrategy],
})
export class SignatureModule {}
