import { AppJwtModule } from '@jwt/app-jwt';
import { Module } from '@nestjs/common';
import { OtpModule } from '@otp/otp';
import { SignatureModule } from '@sign/signature';
import { AuthForgetPasswordController } from './controller/auth-forget-password.controller';
import { AuthController } from './controller/auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { AuthForgetPasswordService } from './service/auth-forget-password.service';
import { AuthService } from './service/auth.service';

@Module({
  imports: [AppJwtModule, OtpModule, SignatureModule],
  controllers: [AuthController, AuthForgetPasswordController],
  providers: [AuthService, AuthForgetPasswordService, AuthRepository],
})
export class AuthModule {}
