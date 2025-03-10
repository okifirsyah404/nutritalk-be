import { NutritionistPatientIndexQuery } from "@app/app/nutritionist/patient/dto/query/nutritionist-patient-index.query";
import { NutritionistPatientResponse } from "@app/app/nutritionist/patient/dto/response/nutritionist-patient.response";
import { BaseApiPaginationResponse, BaseApiResponse } from "@common";
import { PatientSuccessMessage } from "@constant/message";
import { AccessTokenGuard } from "@module/app-jwt";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistPatientService } from "../service/nutritionist-patient.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "patient"))
export class NutritionistPatientController {
	constructor(private readonly service: NutritionistPatientService) {}

	@Get()
	async paginatePatients(
		@Query() query: NutritionistPatientIndexQuery,
	): Promise<BaseApiPaginationResponse<NutritionistPatientResponse>> {
		const result = await this.service.paginatePatients(query);

		return BaseApiPaginationResponse.success({
			pagination: result.pagination,
			message: PatientSuccessMessage.SUCCESS_GET_PATIENT,
			data: NutritionistPatientResponse.fromEntities(result.items),
		});
	}

	@Get(":patientId")
	async getPatientById(
		@Param("patientId") patientId: string,
	): Promise<BaseApiResponse<NutritionistPatientResponse>> {
		const result = await this.service.getPatientById(patientId);

		return BaseApiResponse.success({
			message: PatientSuccessMessage.SUCCESS_GET_PATIENT,
			data: NutritionistPatientResponse.fromEntity(result),
		});
	}
}
