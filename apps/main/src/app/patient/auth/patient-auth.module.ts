import { AppJwtModule } from "@module/app-jwt";
import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { PatientAuthController } from "./controller/patient-auth.controller";
import { PatientAuthService } from "./service/patient-auth.service";
import { PatientAuthRepository } from "@app/app/patient/auth/repository/patient-auth.repository";
import { PatientForgetPasswordRepository } from "@app/app/patient/auth/repository/patient-forget-password.repository";
import { PatientForgetPasswordService } from "@app/app/patient/auth/service/patient-forget-password.service";
import { PatientForgetPasswordController } from "@app/app/patient/auth/controller/patient-forget-password.controller";

@Module({
	imports: [AppJwtModule, OtpModule, SignatureModule],
	controllers: [PatientAuthController, PatientForgetPasswordController],
	providers: [
		PatientAuthService,
		PatientForgetPasswordService,
		PatientAuthRepository,
		PatientForgetPasswordRepository,
	],
})
export class PatientAuthModule {}
