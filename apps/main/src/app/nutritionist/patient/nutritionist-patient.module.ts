import { Module } from "@nestjs/common";
import { NutritionistPatientService } from "./service/nutritionist-patient.service";
import { NutritionistPatientController } from "./controller/nutritionist-patient-controller";
import { NutritionistPatientRepository } from "@app/app/nutritionist/patient/repository/nutritionist-patient.repository";

@Module({
	controllers: [NutritionistPatientController],
	providers: [NutritionistPatientService, NutritionistPatientRepository],
})
export class NutritionistPatientModule {}
