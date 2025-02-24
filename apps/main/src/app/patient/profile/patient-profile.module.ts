import { Module } from "@nestjs/common";
import { PatientProfileController } from "./controller/patient-profile.controller";
import { PatientProfileService } from "./service/patient-profile.service";

@Module({
	controllers: [PatientProfileController],
	providers: [PatientProfileService],
})
export class PatientProfileModule {}
