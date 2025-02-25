import { Module } from "@nestjs/common";
import { PatientConsultationController } from "./controller/patient-consultation.controller";
import { PatientConsultationService } from "./service/patient-consultation.service";

@Module({
	controllers: [PatientConsultationController],
	providers: [PatientConsultationService],
})
export class PatientConsultationModule {}
