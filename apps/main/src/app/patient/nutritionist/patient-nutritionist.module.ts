import { Module } from "@nestjs/common";
import { PatientNutritionistService } from "./service/patient-nutritionist.service";
import { PatientNutritionistController } from "./controller/patient-nutritionist.controller";
import { PatientNutritionistRepository } from "@app/app/patient/nutritionist/repository/patient-nutritionist.repository";

@Module({
	controllers: [PatientNutritionistController],
	providers: [PatientNutritionistService, PatientNutritionistRepository],
})
export class PatientNutritionistModule {}
