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
import { PatientAuthRegisterService } from "@app/app/patient/auth/service/patient-auth-register.service";
import { PatientAuthRegisterRepository } from "@app/app/patient/auth/repository/patient-auth-register.repository";
import { PatientAuthRegisterController } from "@app/app/patient/auth/controller/patient-auth-register.controller";
import { PatientAuthSSORepository } from "@app/app/patient/auth/repository/patient-auth-sso.repository";
import { PatientAuthSSOService } from "@app/app/patient/auth/service/patient-auth-sso.service";
import { PatientAuthSSOController } from "@app/app/patient/auth/controller/patient-auth-sso.controller";

@Module({
	imports: [AppJwtModule, OtpModule, SignatureModule],
	controllers: [
		PatientAuthController,
		PatientAuthRegisterController,
		PatientAuthSSOController,
		PatientForgetPasswordController,
	],
	providers: [
		PatientAuthService,
		PatientAuthRegisterService,
		PatientAuthSSOService,
		PatientForgetPasswordService,
		PatientAuthRepository,
		PatientAuthRegisterRepository,
		PatientAuthSSORepository,
		PatientForgetPasswordRepository,
	],
})
export class PatientAuthModule {}
