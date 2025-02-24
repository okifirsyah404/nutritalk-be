import { Controller } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientProfileService } from "../service/patient-profile.service";

@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "profile"))
export class PatientProfileController {
	constructor(private readonly profileService: PatientProfileService) {}
}
