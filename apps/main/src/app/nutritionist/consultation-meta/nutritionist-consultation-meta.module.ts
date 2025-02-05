import { Module } from "@nestjs/common";
import { NutritionistConsultationMetaController } from "./controller/consultation-meta.controller";
import { NutritionistConsultationMetaRepository } from "./repository/nutritionist-consultation-meta.repository";
import { NutritionistConsultationMetaService } from "./service/nutritionist-consultation-meta.service";

@Module({
	controllers: [NutritionistConsultationMetaController],
	providers: [
		NutritionistConsultationMetaService,
		NutritionistConsultationMetaRepository,
	],
})
export class NutritionistConsultationMetaModule {}
