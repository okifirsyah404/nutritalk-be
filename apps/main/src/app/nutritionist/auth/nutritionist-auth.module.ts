import { AppJwtModule } from "@module/app-jwt";
import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { NutritionistAuthSSOController } from "./controller/nutritionist-auth-sso.controller";
import { NutritionistAuthController } from "./controller/nutritionist-auth.controller";
import { NutritionistForgetPasswordController } from "./controller/nutritionist-forget-password.controller";
import { NutritionistAuthSSORepository } from "./repository/nutritionist-auth-sso.repository";
import { NutritionistAuthRepository } from "./repository/nutritionist-auth.repository";
import { NutritionistForgetPasswordRepository } from "./repository/nutritionist-forget-password.repository";
import { NutritionistAuthService } from "./service/nutritionist-auth.service";
import { NutritionistForgetPasswordService } from "./service/nutritionist-forget-password.service";
import { NutritionistAuthSSOService } from "./service/nutritionist-auth-sso.service";

@Module({
	imports: [AppJwtModule, OtpModule, SignatureModule],
	controllers: [
		NutritionistAuthController,
		NutritionistAuthSSOController,
		NutritionistForgetPasswordController,
	],
	providers: [
		NutritionistAuthService,
		NutritionistAuthSSOService,
		NutritionistForgetPasswordService,
		NutritionistAuthRepository,
		NutritionistAuthSSORepository,
		NutritionistForgetPasswordRepository,
	],
})
export class NutritionistAuthModule {}
