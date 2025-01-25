import { AppJwtModule } from "@module/app-jwt";
import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { AuthForgetPasswordController } from "./controller/auth-forget-password.controller";
import { AuthController } from "./controller/auth.controller";
import { AuthRepository } from "./repository/auth.repository";
import { AuthForgetPasswordService } from "./service/auth-forget-password.service";
import { AuthService } from "./service/auth.service";

@Module({
	imports: [AppJwtModule, OtpModule, SignatureModule],
	controllers: [AuthController, AuthForgetPasswordController],
	providers: [AuthService, AuthForgetPasswordService, AuthRepository],
})
export class AuthModule {}
