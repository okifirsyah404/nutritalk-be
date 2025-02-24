import { Module } from "@nestjs/common";
import { PatientAccountController } from "./controller/patient-account.controller";
import { PatientAccountService } from "./service/patient-account.service";

@Module({
	controllers: [PatientAccountController],
	providers: [PatientAccountService],
})
export class PatientAccountModule {}
