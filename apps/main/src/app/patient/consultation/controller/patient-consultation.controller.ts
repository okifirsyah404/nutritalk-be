import { AccessTokenGuard } from "@module/app-jwt";
import { Controller, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientConsultationService } from "../service/patient-consultation.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "consultation"))
export class PatientConsultationController {
	constructor(private readonly service: PatientConsultationService) {}
}
