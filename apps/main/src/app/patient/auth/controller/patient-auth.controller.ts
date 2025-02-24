import { Controller } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientAuthService } from "../service/patient-auth.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "auth"))
export class PatientAuthController {
	constructor(private readonly authService: PatientAuthService) {}
}
