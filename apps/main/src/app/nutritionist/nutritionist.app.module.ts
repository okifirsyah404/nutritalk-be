import { Module } from "@nestjs/common";
import { NutritionistAccountModule } from "./account/nutritionist-account.module";
import { NutritionistAuthModule } from "./auth/nutritionist-auth.module";

@Module({
	imports: [NutritionistAuthModule, NutritionistAccountModule],
	controllers: [],
	providers: [],
})
export class NutritionistAppModule {}
