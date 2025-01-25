import {
	BaseApiPaginationResponse,
	BaseApiResponse,
	IndexPaginationRequest,
} from "@common";
import { ScheduleSuccessMessage } from "@constant/message";
import {
	IApiPaginationResponse,
	IApiResponse,
	INutritionistEntity,
	IScheduleEntity,
} from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { TimeRange } from "@util";
import { CreateScheduleTimeRequest } from "../dto/request/create-schedule-time.request";
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
	): Promise<IApiResponse<ScheduleResponse>> {
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
	): Promise<IApiPaginationResponse<ScheduleTimeResponse>> {
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

	@Post(":scheduleId/times")
	async createScheduleTime(
		@Param("scheduleId") scheduleId: string,
		@Body() reqBody: CreateScheduleTimeRequest,
	): Promise<IApiResponse<ScheduleTimeResponse>> {
		const timeRange = TimeRange.fromDates(reqBody.start, reqBody.end);

		const result = await this.service.createScheduleTime(scheduleId, timeRange);

		return BaseApiResponse.success({
			message: ScheduleSuccessMessage.SUCCESS_CREATE_SCHEDULE_TIME,
			data: ScheduleTimeResponse.fromEntity(result),
		});
	}
}
