import { BaseApiPaginationResponse, BaseApiResponse } from "@common";
import { NutritionistSuccessMessage } from "@constant/message";
import {
	IApiPaginationResponse,
	IApiResponse,
	INutritionistEntity,
} from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistIndexQuery } from "../dto/query/nutritionist-index.query";
import { NutritionistResponse } from "../dto/response/nutritionist.response";
import { NutritionistService } from "../service/nutritionist.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, ""))
export class NutritionistController {
	constructor(private readonly service: NutritionistService) {}

	/**
	 * Retrieves the list of nutritionists based on the provided query parameters.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - pagination: object of pagination details
	 * - data: list of objects of nutritionist information
	 *
	 */
	@Get()
	async paginateNutritionists(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Query() query: NutritionistIndexQuery,
	): Promise<IApiPaginationResponse<NutritionistResponse>> {
		const result = await this.service.paginateNutritionists(
			nutritionist.id,
			query,
		);

		return BaseApiPaginationResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_NUTRITIONIST,
			pagination: result.pagination,
			data: NutritionistResponse.fromEntities(result.items),
		});
	}

	/**
	 * Retrieves the nutritionist information based on the provided ID.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of nutritionist information
	 *
	 */
	@Get(":nutritionistId")
	async getNutritionist(
		@Param("nutritionistId") id: string,
	): Promise<IApiResponse<NutritionistResponse>> {
		const result = await this.service.getNutritionist(id);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_NUTRITIONIST,
			data: NutritionistResponse.fromEntity(result),
		});
	}
}
