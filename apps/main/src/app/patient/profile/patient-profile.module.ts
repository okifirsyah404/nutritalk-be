import { Module } from "@nestjs/common";
import { PatientProfileController } from "./controller/patient-profile.controller";
import { PatientProfileService } from "./service/patient-profile.service";
import { PatientProfileRepository } from "@app/app/patient/profile/repository/patient-profile.repository";

@Module({
	controllers: [PatientProfileController],
	providers: [PatientProfileService, PatientProfileRepository],
})
export class PatientProfileModule {}
