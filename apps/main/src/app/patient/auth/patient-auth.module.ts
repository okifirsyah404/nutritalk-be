import { AppJwtModule } from "@module/app-jwt";
import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { PatientAuthController } from "./controller/patient-auth.controller";
import { PatientAuthService } from "./service/patient-auth.service";

@Module({
	imports: [AppJwtModule, OtpModule, SignatureModule],
	controllers: [PatientAuthController],
	providers: [PatientAuthService],
})
export class PatientAuthModule {}
