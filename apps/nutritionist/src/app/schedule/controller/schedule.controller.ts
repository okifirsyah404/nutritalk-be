import { IndexPaginationRequest } from "@common/request/index-pagination.request";
import {
	BaseApiPaginationResponse,
	BaseApiResponse,
} from "@common/response/base-api.response";
import { ScheduleSuccessMessage } from "@constant/constant";
import {
	IApiPaginationResponse,
	IApiResponse,
} from "@contract/response/api-response.interface";
import {
	INutritionistEntity,
	IScheduleEntity,
	IScheduleTimeEntity,
} from "@database/prisma";
import { AccessTokenGuard } from "@jwt/app-jwt";
import GetNutritionistLogged from "@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ScheduleTimeResponse } from "../dto/response/schedule-time.response";
import { ScheduleResponse } from "../dto/response/schedule.response";
import { ScheduleService } from "../service/schedule.service";

@UseGuards(AccessTokenGuard)
@Controller("schedules")
export class ScheduleController {
	constructor(private readonly service: ScheduleService) {}

	@Get()
	async paginateSchedule(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Query() indexQuery: IndexPaginationRequest,
	): Promise<IApiPaginationResponse<IScheduleEntity>> {
		const result = await this.service.paginateSchedule(
			nutritionist.id,
			indexQuery,
		);

		return BaseApiPaginationResponse.success({
			message: ScheduleSuccessMessage.SUCCESS_GET_SCHEDULE,
			pagination: result.pagination,
			data: ScheduleResponse.fromEntities(result.items),
		});
	}

	@Get(":scheduleId/toggle-active")
	async toggleScheduleActive(
		@Param("scheduleId") scheduleId: string,
	): Promise<IApiResponse<IScheduleEntity>> {
		const result = await this.service.toggleScheduleActive(scheduleId);

		return BaseApiResponse.success({
			message: ScheduleSuccessMessage.SUCCESS_TOGGLE_SCHEDULE_ACTIVE,
			data: ScheduleResponse.fromEntity(result),
		});
	}

	@Get(":scheduleId/times")
	async paginateScheduleTime(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Param("scheduleId") scheduleId: string,
		@Query() indexQuery: IndexPaginationRequest,
	): Promise<IApiPaginationResponse<IScheduleTimeEntity>> {
		const result = await this.service.paginateScheduleTime(
			nutritionist.id,
			scheduleId,
			indexQuery,
		);

		return BaseApiPaginationResponse.success({
			message: ScheduleSuccessMessage.SUCCESS_GET_SCHEDULE_TIME,
			pagination: result.pagination,
			data: ScheduleTimeResponse.fromEntities(result.items),
		});
	}
}
