import { Module } from "@nestjs/common";
import { NutritionistAccountModule } from "./account/nutritionist-account.module";
import { NutritionistAuthModule } from "./auth/nutritionist-auth.module";
import { NutritionistCertificateModule } from "./certificate/nutritionist-certificate.module";
import { NutritionistConsultationMetaModule } from "./consultation-meta/nutritionist-consultation-meta.module";
import { NutritionistConsultationModule } from "./consultation/nutritionist-consultation.module";
import { NutritionistCredentialModule } from "./credential/nutritionist-credential.module";
import { NutritionistModule } from "./nutritionist/nutritionist.module";
import { NutritionistOccupationModule } from "./occupation/nutritionist-occupation.module";
import { NutritionistPriceModule } from "./price/nutritionist-price.module";
import { NutritionistProfileModule } from "./profile/nutritionist-profile.module";
import { NutritionistScheduleModule } from "./schedule/nutritionist-schedule.module";

@Module({
	imports: [
		NutritionistAuthModule,
		NutritionistAccountModule,
		NutritionistProfileModule,
		NutritionistPriceModule,
		NutritionistCertificateModule,
		NutritionistOccupationModule,
		NutritionistScheduleModule,
		NutritionistConsultationMetaModule,
		NutritionistCredentialModule,
		NutritionistConsultationModule,
		NutritionistModule,
	],
	controllers: [],
	providers: [],
})
export class NutritionistAppModule {}
