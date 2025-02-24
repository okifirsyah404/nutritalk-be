import { Module } from "@nestjs/common";
import { PatientMedicalRecordController } from "./controller/patient-medical-record.controller";
import { PatientMedicalRecordService } from "./service/patient-medical-record.service";

@Module({
	controllers: [PatientMedicalRecordController],
	providers: [PatientMedicalRecordService],
})
export class PatientMedicalRecordModule {}
