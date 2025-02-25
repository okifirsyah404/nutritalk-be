import { Controller } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientConsultationService } from "../service/patient-consultation.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "consultation"))
export class PatientConsultationController {
	constructor(
		private readonly consultationService: PatientConsultationService,
	) {}
}
