import { Module } from "@nestjs/common";
import { NutritionistPatientService } from "./service/nutritionist-patient.service";
import { NutritionistPatientController } from "./controller/nutritionist-patient-controller";

@Module({
	controllers: [NutritionistPatientController],
	providers: [NutritionistPatientService],
})
export class NutritionistPatientModule {}
