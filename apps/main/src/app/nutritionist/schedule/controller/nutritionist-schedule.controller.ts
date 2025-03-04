import {
	BaseApiPaginationResponse,
	BaseApiResponse,
	IndexPaginationRequest,
} from "@common";
import { NutritionistSuccessMessage } from "@constant/message";
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
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistCreateScheduleTimeRequest } from "../dto/request/nutritionist-create-schedule-time.request";
import { NutritionistUpdateScheduleTimeRequest } from "../dto/request/nutritionist-update-schedule-time.request";
import { NutritionistScheduleTimeResponse } from "../dto/response/nutritionist-schedule-time.response";
import { NutritionistScheduleResponse } from "../dto/response/nutritionist-schedule.response";
import { NutritionistScheduleService } from "../service/nutritionist-schedule.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "schedule"))
export class NutritionistScheduleController {
	constructor(private readonly service: NutritionistScheduleService) {}

	/**
	 * Retrieves the pagination schedule information associated with the currently logged-in nutritionist.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - pagination: object of pagination information
	 * - data: list of schedule information
	 *
	 */
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
			message: NutritionistSuccessMessage.SUCCESS_GET_SCHEDULE,
			pagination: result.pagination,
			data: NutritionistScheduleResponse.fromEntities(result.items),
		});
	}

	/**
	 * Toggles the active status of a schedule.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of schedule information
	 *
	 */
	@Get(":scheduleId/toggle-active")
	async toggleScheduleActive(
		@Param("scheduleId") scheduleId: string,
	): Promise<IApiResponse<NutritionistScheduleResponse>> {
		const result = await this.service.toggleScheduleActive(scheduleId);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_TOGGLE_SCHEDULE_ACTIVE,
			data: NutritionistScheduleResponse.fromEntity(result),
		});
	}

	/**
	 * Retrieves the pagination schedule time information associated with the currently logged-in nutritionist.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - pagination: object of pagination information
	 * - data: list of schedule time information
	 *
	 */
	@Get(":scheduleId/time")
	async paginateScheduleTime(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Param("scheduleId") scheduleId: string,
		@Query() indexQuery: IndexPaginationRequest,
	): Promise<IApiPaginationResponse<NutritionistScheduleTimeResponse>> {
		const result = await this.service.paginateScheduleTime(
			nutritionist.id,
			scheduleId,
			indexQuery,
		);

		return BaseApiPaginationResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_SCHEDULE_TIME,
			pagination: result.pagination,
			data: NutritionistScheduleTimeResponse.fromEntities(result.items),
		});
	}

	/**
	 * Creates a new schedule time for a given schedule.
	 *
	 * Request body:
	 * - start: (required) string
	 * - end: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of created schedule time
	 *
	 */
	@Post(":scheduleId/time")
	async createScheduleTime(
		@Param("scheduleId") scheduleId: string,
		@Body() reqBody: NutritionistCreateScheduleTimeRequest,
	): Promise<IApiResponse<NutritionistScheduleTimeResponse>> {
		const result = await this.service.createScheduleTime(scheduleId, reqBody);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_CREATE_SCHEDULE_TIME,
			data: NutritionistScheduleTimeResponse.fromEntity(result),
		});
	}

	/**
	 * Retrieves a schedule time entity by its ID.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of schedule time information
	 *
	 */
	@Get(":scheduleId/time/:scheduleTimeId")
	async getScheduleTime(
		@Param("scheduleTimeId") scheduleTimeId: string,
	): Promise<IApiResponse<NutritionistScheduleTimeResponse>> {
		const result = await this.service.getScheduleTime(scheduleTimeId);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_SCHEDULE_TIME,
			data: NutritionistScheduleTimeResponse.fromEntity(result),
		});
	}

	/**
	 * Updates an existing schedule time entry.
	 *
	 * Request body:
	 * - start: (required) string
	 * - end: (required) string
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of updated schedule time
	 *
	 */
	@Put(":scheduleId/time/:scheduleTimeId")
	async updateScheduleTime(
		@Param("scheduleId") scheduleId: string,
		@Param("scheduleTimeId") scheduleTimeId: string,
		@Body() reqBody: NutritionistUpdateScheduleTimeRequest,
	): Promise<IApiResponse<NutritionistScheduleTimeResponse>> {
		const result = await this.service.updateScheduleTime(
			scheduleId,
			scheduleTimeId,
			reqBody,
		);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_UPDATE_SCHEDULE_TIME,
			data: NutritionistScheduleTimeResponse.fromEntity(result),
		});
	}

	/**
	 * Deletes an existing schedule time entry.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: undefined
	 *
	 */
	@Delete(":scheduleId/time/:scheduleTimeId")
	async deleteScheduleTime(
		@Param("scheduleTimeId") scheduleTimeId: string,
	): Promise<IApiResponse<NutritionistScheduleTimeResponse>> {
		await this.service.deleteScheduleTime(scheduleTimeId);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_DELETE_SCHEDULE_TIME,
			data: undefined,
		});
	}

	/**
	 * Retrieves a schedule entity by its ID.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of schedule information
	 *
	 */
	@Get(":scheduleId")
	async getScheduleById(
		@Param("scheduleId") scheduleId: string,
	): Promise<IApiResponse<NutritionistScheduleResponse>> {
		const result = await this.service.getScedule(scheduleId);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_SCHEDULE,
			data: NutritionistScheduleResponse.fromEntity(result),
		});
	}
}
