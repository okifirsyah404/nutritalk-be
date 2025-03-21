import { Module } from "@nestjs/common";
import { PatientConsultationController } from "./controller/patient-consultation.controller";
import { PatientConsultationRepository } from "./repository/patient-consultation.repository";
import { PatientConsultationService } from "./service/patient-consultation.service";

@Module({
	controllers: [PatientConsultationController],
	providers: [PatientConsultationService, PatientConsultationRepository],
})
export class PatientConsultationModule {}
