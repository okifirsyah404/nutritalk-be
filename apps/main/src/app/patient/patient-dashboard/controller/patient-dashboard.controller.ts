import { BaseApiResponse } from "@common";
import { PatientSuccessMessage } from "@constant/message";
import { IPatientEntity } from "@contract";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientDashboardResponse } from "../dto/response/patient-dashboard.response";
import { PatientDashboardService } from "../service/patient-dashboard.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "dashboard"))
export class PatientDashboardController {
	constructor(private readonly service: PatientDashboardService) {}

	@Get()
	async getPatientDashboard(
		@GetPatientLogged() patient: IPatientEntity,
	): Promise<BaseApiResponse<PatientDashboardResponse>> {
		const result = await this.service.getPatientDashboard(patient.id);

		return BaseApiResponse.success({
			message: PatientSuccessMessage.SUCCESS_GET_PATIENT_DASHBOARD,
			data: PatientDashboardResponse.fromEntity(result),
		});
	}
}
