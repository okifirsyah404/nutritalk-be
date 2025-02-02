import { Module } from "@nestjs/common";
import { NutritionistAccountService } from "./nutritionist-account.service";
import { NutritionistAccountController } from "./nutritionist-account.controller";

@Module({
	controllers: [NutritionistAccountController],
	providers: [NutritionistAccountService],
})
export class NutritionistAccountModule {}
