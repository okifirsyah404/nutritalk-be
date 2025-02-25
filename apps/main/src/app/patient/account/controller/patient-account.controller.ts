import { Controller } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientAccountService } from "../service/patient-account.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "account"))
export class PatientAccountController {
	constructor(private readonly accountService: PatientAccountService) {}
}
