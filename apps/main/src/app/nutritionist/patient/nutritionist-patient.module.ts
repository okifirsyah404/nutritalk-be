import { NutritionistPatientRepository } from "@app/app/nutritionist/patient/repository/nutritionist-patient.repository";
import { Module } from "@nestjs/common";
import { NutritionistPatientController } from "./controller/nutritionist-patient.controller";
import { NutritionistPatientService } from "./service/nutritionist-patient.service";

@Module({
	controllers: [NutritionistPatientController],
	providers: [NutritionistPatientService, NutritionistPatientRepository],
})
export class NutritionistPatientModule {}
