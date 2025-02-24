import { Module } from "@nestjs/common";
import { PatientBMIController } from "./controller/patient-bmi.controller";
import { PatientBMIService } from "./service/patient-bmi.service";

@Module({
	controllers: [PatientBMIController],
	providers: [PatientBMIService],
})
export class PatientBMIModule {}
