import { NutritionistConsultationResponse } from "@app/app/nutritionist/consultation/dto/response/nutritionist-consultation.response";
import { BaseApiPaginationResponse, BaseApiResponse } from "@common";
import { ConsultationSuccessMessage } from "@constant/message";
import {
	IApiPaginationResponse,
	IApiResponse,
	INutritionistEntity,
} from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import {
	Body,
	Controller,
	Get,
	Param,
	Put,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistConsultationIndexQuery } from "../dto/query/nutritionist-consultation-index.query";
import { NutritionistRescheduleConsultationRequest } from "../dto/request/nutritionist-reschedule-consultation.request";
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

	@Get(":consultationId/status/scheduled")
	async setConsultationStatusScheduled(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Param("consultationId") consultationId: string,
	): Promise<IApiResponse<NutritionistConsultationResponse>> {
		const result = await this.service.setConsultationStatusAsScheduled(
			nutritionist.id,
			consultationId,
		);

		return BaseApiResponse.success({
			message:
				ConsultationSuccessMessage.SUCCESS_UPDATE_CONSULTATION_AS_SCHEDULED,
			data: NutritionistConsultationResponse.fromEntity(result),
		});
	}

	@Get(":consultationId/status/finished")
	async setConsultationStatusFinished(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Param("consultationId") consultationId: string,
	): Promise<IApiResponse<NutritionistConsultationResponse>> {
		const result = await this.service.setConsultationStatusAsFinished(
			nutritionist.id,
			consultationId,
		);

		return BaseApiResponse.success({
			message:
				ConsultationSuccessMessage.SUCCESS_UPDATE_CONSULTATION_AS_FINISHED,
			data: NutritionistConsultationResponse.fromEntity(result),
		});
	}

	@Get(":consultationId/status/canceled")
	async setConsultationStatusCanceled(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Param("consultationId") consultationId: string,
	): Promise<IApiResponse<NutritionistConsultationResponse>> {
		const result = await this.service.setConsultationStatusAsCanceled(
			nutritionist.id,
			consultationId,
		);

		return BaseApiResponse.success({
			message:
				ConsultationSuccessMessage.SUCCESS_UPDATE_CONSULTATION_AS_CANCELLED,
			data: NutritionistConsultationResponse.fromEntity(result),
		});
	}

	@Put(":consultationId/status/reschedule")
	async setConsultationStatusReScheduled(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Param("consultationId") consultationId: string,
		@Body() reqBody: NutritionistRescheduleConsultationRequest,
	): Promise<IApiResponse<NutritionistConsultationResponse>> {
		const result = await this.service.rescheduleConsultation(
			nutritionist.id,
			consultationId,
			reqBody,
		);

		return BaseApiResponse.success({
			message:
				ConsultationSuccessMessage.SUCCESS_UPDATE_CONSULTATION_AS_RE_SCHEDULED,
			data: NutritionistConsultationResponse.fromEntity(result),
		});
	}
}
