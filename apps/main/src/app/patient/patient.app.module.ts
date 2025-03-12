import { Module } from "@nestjs/common";
import { PatientAccountModule } from "./account/patient-account.module";
import { PatientAuthModule } from "./auth/patient-auth.module";
import { PatientBMIModule } from "./bmi/patient-bmi.module";
import { PatientConsultationModule } from "./consultation/patient-consultation.module";
import { PatientMedicalRecordModule } from "./medical-record/patient-medical-record.module";
import { PatientProfileModule } from "./profile/patient-profile.module";
import { PatientNutritionistModule } from "@app/app/patient/nutritionist/patient-nutritionist.module";
import { PatientDashboardModule } from './patient-dashboard/patient-dashboard.module';

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
		PatientNutritionistModule,
		PatientDashboardModule,
	],
})
export class PatientAppModule {}
