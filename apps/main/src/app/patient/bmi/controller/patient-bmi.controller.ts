import { Controller } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientBMIService } from "../service/patient-bmi.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "bmi"))
export class PatientBMIController {
	constructor(private readonly bmiService: PatientBMIService) {}
}
