import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { NutritionistAccountSSOController } from "./controller/nutritionist-account-sso.controller";
import { NutritionistAccountController } from "./controller/nutritionist-account.controller";
import { NutritionistChangePasswordController } from "./controller/nutritionist-change-password.controller";
import { NutritionistAccountSSORepository } from "./repository/nutritionist-account-sso.repository";
import { NutritionistAccountRepository } from "./repository/nutritionist-account.repository";
import { NutritionistChangePasswordRepository } from "./repository/nutritionist-change-password.repository";
import { NutritionistAccountSSOService } from "./service/nutritionist-account-sso.service";
import { NutritionistAccountService } from "./service/nutritionist-account.service";
import { NutritionistChangePasswordService } from "./service/nutritionist-change-password.service";

@Module({
	imports: [OtpModule, SignatureModule],
	controllers: [
		NutritionistAccountController,
		NutritionistChangePasswordController,
		NutritionistAccountSSOController,
	],
	providers: [
		NutritionistAccountService,
		NutritionistChangePasswordService,
		NutritionistAccountSSOService,
		NutritionistAccountRepository,
		NutritionistChangePasswordRepository,
		NutritionistAccountSSORepository,
	],
})
export class NutritionistAccountModule {}
