import { Module } from "@nestjs/common";
import { NutritionistCertificateService } from "./nutritionist-certificate.service";
import { NutritionistCertificateController } from "./nutritionist-certificate.controller";

@Module({
	controllers: [NutritionistCertificateController],
	providers: [NutritionistCertificateService],
})
export class NutritionistCertificateModule {}
