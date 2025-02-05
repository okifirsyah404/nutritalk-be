import { AppJwtModule } from "@module/app-jwt";
import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { NutritionistAuthController } from "./controller/nutritionist-auth.controller";
import { NutritionistForgetPasswordController } from "./controller/nutritionist-forget-password.controller";
import { NutritionistAuthSsoRepository } from "./repository/nutritionist-auth-sso.repository";
import { NutritionistAuthRepository } from "./repository/nutritionist-auth.repository";
import { NutritionistForgetPasswordRepository } from "./repository/nutritionist-forget-password.repository";
import { NutritionistAuthSsoService } from "./service/nutritionist-auth-sso.service";
import { NutritionistAuthService } from "./service/nutritionist-auth.service";
import { NutritionistForgetPasswordService } from "./service/nutritionist-forget-password.service";

@Module({
	imports: [AppJwtModule, OtpModule, SignatureModule],
	controllers: [
		NutritionistAuthController,
		NutritionistForgetPasswordController,
	],
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
