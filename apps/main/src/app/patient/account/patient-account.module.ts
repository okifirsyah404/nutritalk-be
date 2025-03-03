import { Module } from "@nestjs/common";
import { PatientAccountController } from "./controller/patient-account.controller";
import { PatientAccountService } from "./service/patient-account.service";
import { PatientAccountRepository } from "@app/app/patient/account/repository/patient-account.repository";
import { PatientAccountSSORepository } from "@app/app/patient/account/repository/patient-account-sso.repository";
import { PatientChangePasswordRepository } from "@app/app/patient/account/repository/patient-change-password.repository";
import { PatientAccountSSOController } from "@app/app/patient/account/controller/patient-account-sso.controller";
import { PatientChangePasswordController } from "@app/app/patient/account/controller/patient-change-password.controller";
import { PatientAccountSSOService } from "@app/app/patient/account/service/patient-account-sso.service";
import { PatientChangePasswordService } from "@app/app/patient/account/service/patient-change-password.service";
import { SignatureModule } from "@module/signature";
import { OtpModule } from "@module/otp";

@Module({
	imports: [OtpModule, SignatureModule],
	controllers: [
		PatientAccountController,
		PatientAccountSSOController,
		PatientChangePasswordController,
	],
	providers: [
		PatientAccountService,
		PatientAccountSSOService,
		PatientChangePasswordService,
		PatientAccountRepository,
		PatientAccountSSORepository,
		PatientChangePasswordRepository,
	],
})
export class PatientAccountModule {}
