import { NutritionistConsultationResponse } from "@app/app/nutritionist/consultation/dto/response/nutritionist-consultation.response";
import { BaseApiPaginationResponse, BaseApiResponse } from "@common";
import { ConsultationSuccessMessage } from "@constant/message";
import {
	IApiPaginationResponse,
	IApiResponse,
	INutritionistEntity,
} from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistConsultationIndexQuery } from "../dto/query/nutritionist-consultation-index.query";
import { NutritionistConsultationService } from "../service/nutritionist-consultation.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "consultation"))
export class NutritionistConsultationController {
	constructor(private readonly service: NutritionistConsultationService) {}

	@Get()
	async paginateConsultation(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Query() query: NutritionistConsultationIndexQuery,
	): Promise<IApiPaginationResponse<NutritionistConsultationResponse>> {
		const result = await this.service.paginateConsultation(
			nutritionist.id,
			query,
		);

		return BaseApiPaginationResponse.success({
			message: ConsultationSuccessMessage.SUCCESS_GET_CONSULTATION,
			pagination: result.pagination,
			data: NutritionistConsultationResponse.fromEntities(result.items),
		});
	}

	@Get(":consultationId")
	async getConsultationById(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Param("consultationId") consultationId: string,
	): Promise<IApiResponse<NutritionistConsultationResponse>> {
		const result = await this.service.getConsultationById(
			nutritionist.id,
			consultationId,
		);

		return BaseApiResponse.success({
			message: ConsultationSuccessMessage.SUCCESS_GET_CONSULTATION,
			data: NutritionistConsultationResponse.fromEntity(result),
		});
	}
}
