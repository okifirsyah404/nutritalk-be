import { AppJwtModule } from "@module/app-jwt";
import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { PatientAuthController } from "./controller/patient-auth.controller";
import { PatientAuthService } from "./service/patient-auth.service";
import { PatientAuthRepository } from "@app/app/patient/auth/repository/patient-auth.repository";

@Module({
	imports: [AppJwtModule, OtpModule, SignatureModule],
	controllers: [PatientAuthController],
	providers: [PatientAuthService, PatientAuthRepository],
})
export class PatientAuthModule {}
