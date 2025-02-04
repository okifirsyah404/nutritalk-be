import { Module } from "@nestjs/common";
import { NutritionistAccountModule } from "./account/nutritionist-account.module";
import { NutritionistAuthModule } from "./auth/nutritionist-auth.module";
import { NutritionistPriceModule } from "./price/nutritionist-price.module";
import { NutritionistCertificateModule } from "./certificate/nutritionist-certificate.module";
import { NutritionistOccupationModule } from "./occupation/nutritionist-occupation.module";

@Module({
	imports: [
		NutritionistAuthModule,
		NutritionistAccountModule,
		NutritionistPriceModule,
		NutritionistCertificateModule,
		NutritionistOccupationModule,
	],
	controllers: [],
	providers: [],
})
export class NutritionistAppModule {}
