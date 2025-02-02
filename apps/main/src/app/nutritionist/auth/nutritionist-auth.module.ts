import { AppJwtModule } from "@module/app-jwt";
import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { NutritionistAuthController } from "./controller/nutritionist-auth.controller";
import { NutritionistAuthSsoRepository } from "./repository/nutritionist-auth-sso.repository";
import { NutritionistAuthRepository } from "./repository/nutritionist-auth.repository";
import { NutritionistForgetPasswordRepository } from "./repository/nutritionist-forget-password.repository";
import { NutritionistForgetPasswordService } from "./service/nutritionist-forget-password.service";
import { NutritionistAuthSsoService } from "./service/nutritionist-auth-sso.service";
import { NutritionistAuthService } from "./service/nutritionist-auth.service";

@Module({
	imports: [AppJwtModule, OtpModule, SignatureModule],
	controllers: [NutritionistAuthController],
	providers: [
		NutritionistAuthService,
		NutritionistAuthSsoService,
		NutritionistForgetPasswordService,
		NutritionistAuthRepository,
		NutritionistAuthSsoRepository,
		NutritionistForgetPasswordRepository,
	],
})
export class NutritionistAuthModule {}
