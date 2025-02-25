import { Module } from "@nestjs/common";
import { PatientAccountModule } from "./account/patient-account.module";
import { PatientAuthModule } from "./auth/patient-auth.module";
import { PatientBMIModule } from "./bmi/patient-bmi.module";
import { PatientConsultationModule } from "./consultation/patient-consultation.module";
import { PatientMedicalRecordModule } from "./medical-record/patient-medical-record.module";
import { PatientProfileModule } from "./profile/patient-profile.module";

@Module({
	controllers: [],
	providers: [],
	imports: [
		PatientAuthModule,
		PatientProfileModule,
		PatientConsultationModule,
		PatientAccountModule,
		PatientMedicalRecordModule,
		PatientBMIModule,
	],
})
export class PatientAppModule {}
