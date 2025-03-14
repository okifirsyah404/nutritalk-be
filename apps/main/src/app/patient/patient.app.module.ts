import { PatientNutritionistModule } from "@app/app/patient/nutritionist/patient-nutritionist.module";
import { Module } from "@nestjs/common";
import { PatientAccountModule } from "./account/patient-account.module";
import { PatientAuthModule } from "./auth/patient-auth.module";
import { PatientBMIModule } from "./bmi/patient-bmi.module";
import { PatientConsultationModule } from "./consultation/patient-consultation.module";
import { PatientCreditModule } from "./credit/patient-credit.module";
import { PatientMedicalRecordModule } from "./medical-record/patient-medical-record.module";
import { PatientOrderModule } from "./order/patient-order.module";
import { PatientDashboardModule } from "./patient-dashboard/patient-dashboard.module";
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
		PatientNutritionistModule,
		PatientDashboardModule,
		PatientCreditModule,
		PatientOrderModule,
	],
})
export class PatientAppModule {}
