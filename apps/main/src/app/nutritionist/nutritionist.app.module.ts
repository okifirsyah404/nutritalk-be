import { Module } from "@nestjs/common";
import { NutritionistAccountModule } from "./account/nutritionist-account.module";
import { NutritionistAuthModule } from "./auth/nutritionist-auth.module";
import { NutritionistPriceModule } from "./price/nutritionist-price.module";

@Module({
	imports: [
		NutritionistAuthModule,
		NutritionistAccountModule,
		NutritionistPriceModule,
	],
	controllers: [],
	providers: [],
})
export class NutritionistAppModule {}
