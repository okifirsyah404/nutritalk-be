import { Module } from "@nestjs/common";
import { NutritionistConsultationController } from "./controller/nutritionist-consultation.controller";
import { NutritionistConsultationRepository } from "./repository/nutritionist-consultation.repository";
import { NutritionistConsultationService } from "./service/nutritionist-consultation.service";

@Module({
	controllers: [NutritionistConsultationController],
	providers: [
		NutritionistConsultationService,
		NutritionistConsultationRepository,
	],
})
export class NutritionistConsultationModule {}
