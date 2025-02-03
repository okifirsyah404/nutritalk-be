import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { NutritionistAccountController } from "./controller/nutritionist-account.controller";
import { NutritionistChangePasswordController } from "./controller/nutritionist-change-password.controller";
import { NutritionistAccountRepository } from "./repository/nutritionist-account.repository";
import { NutritionistChangePasswordRepository } from "./repository/nutritionist-change-password.repository";
import { NutritionistAccountService } from "./service/nutritionist-account.service";
import { NutritionistChangePasswordService } from "./service/nutritionist-change-password.service";

@Module({
	imports: [OtpModule, SignatureModule],
	controllers: [
		NutritionistAccountController,
		NutritionistChangePasswordController,
	],
	providers: [
		NutritionistAccountService,
		NutritionistChangePasswordService,
		NutritionistAccountRepository,
		NutritionistChangePasswordRepository,
	],
})
export class NutritionistAccountModule {}
