import { Module } from "@nestjs/common";
import { PatientCreditController } from "./controller/patient-credit.controller";
import { PatientCreditRepository } from "./repository/patient-credit.repository";
import { PatientCreditService } from "./service/patient-credit.service";

@Module({
	controllers: [PatientCreditController],
	providers: [PatientCreditService, PatientCreditRepository],
})
export class PatientCreditModule {}
