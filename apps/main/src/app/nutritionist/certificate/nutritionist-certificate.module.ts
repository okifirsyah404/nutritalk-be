import { Module } from "@nestjs/common";
import { NutritionistCertificateController } from "./controller/nutritionist-certificate.controller";
import { NutritionistCertificateRepository } from "./repository/nutritionist-certificate.repository";
import { NutritionistCertificateService } from "./service/nutritionist-certificate.service";

@Module({
	controllers: [NutritionistCertificateController],
	providers: [
		NutritionistCertificateService,
		NutritionistCertificateRepository,
	],
})
export class NutritionistCertificateModule {}
