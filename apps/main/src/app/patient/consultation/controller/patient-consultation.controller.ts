import { BaseApiPaginationResponse, BaseApiResponse } from "@common";
import { ConsultationSuccessMessage } from "@constant/message";
import {
	IApiPaginationResponse,
	IApiResponse,
	IPatientEntity,
} from "@contract";
import { AccessTokenGuard, GetPatientLogged } from "@module/app-jwt";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { PatientConsultationIndexQuery } from "../dto/query/patient-consultation-index.query";
import { PatientConsultationResponse } from "../dto/response/patient-consultation.response";
import { PatientConsultationService } from "../service/patient-consultation.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.PATIENT, "consultation"))
export class PatientConsultationController {
	constructor(private readonly service: PatientConsultationService) {}

	@Get()
	async paginateConsultation(
		@GetPatientLogged() patient: IPatientEntity,
		@Query() query: PatientConsultationIndexQuery,
	): Promise<IApiPaginationResponse<PatientConsultationResponse>> {
		const result = await this.service.paginateConsultation(patient.id, query);

		return BaseApiPaginationResponse.success({
			message: ConsultationSuccessMessage.SUCCESS_GET_CONSULTATION,
			pagination: result.pagination,
			data: PatientConsultationResponse.fromEntities(result.items),
		});
	}

	@Get(":consultationId")
	async getConsultationById(
		@GetPatientLogged() patient: IPatientEntity,
		@Param("consultationId") consultationId: string,
	): Promise<IApiResponse<PatientConsultationResponse>> {
		const result = await this.service.getConsultationById(
			patient.id,
			consultationId,
		);

		return BaseApiResponse.success({
			message: ConsultationSuccessMessage.SUCCESS_GET_CONSULTATION,
			data: PatientConsultationResponse.fromEntity(result),
		});
	}
}
