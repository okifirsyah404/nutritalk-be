import { Module } from "@nestjs/common";
import { NutritionistConsultationService } from "./nutritionist-consultation.service";
import { NutritionistConsultationController } from "./nutritionist-consultation.controller";

@Module({
	controllers: [NutritionistConsultationController],
	providers: [NutritionistConsultationService],
})
export class NutritionistConsultationModule {}
