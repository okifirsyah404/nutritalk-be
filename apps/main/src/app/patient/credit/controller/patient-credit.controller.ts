import { BaseApiResponse } from "@common";
import { PatientSuccessMessage } from "@constant/message";
import { ICreditEntity, IPatientEntity } from "@contract";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientCreditService } from "../service/patient-credit.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "credit"))
export class PatientCreditController {
	constructor(private readonly service: PatientCreditService) {}

	@Get()
	async getCredit(
		@GetPatientLogged() patient: IPatientEntity,
	): Promise<BaseApiResponse<ICreditEntity>> {
		const result = await this.service.getCreditByPatientId(patient.id);

		return BaseApiResponse.success({
			message: PatientSuccessMessage.SUCCESS_GET_PATIENT_CREDIT,
			data: result,
		});
	}
}
