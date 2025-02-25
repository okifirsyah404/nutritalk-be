import { Controller } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientMedicalRecordService } from "../service/patient-medical-record.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "medical-record"))
export class PatientMedicalRecordController {
	constructor(
		private readonly medicalRecordService: PatientMedicalRecordService,
	) {}
}
