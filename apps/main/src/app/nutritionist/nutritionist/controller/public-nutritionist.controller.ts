import { Controller, Get, Param, Query } from "@nestjs/common";
import { PublicNutritionistService } from "@app/app/nutritionist/nutritionist/service/public-nutritionist.service";
import { IApiPaginationResponse, IApiResponse } from "@contract";
import { NutritionistIndexQuery } from "@app/app/nutritionist/nutritionist/dto/query/nutritionist-index.query";
import { NutritionistResponse } from "@app/app/nutritionist/nutritionist/dto/response/nutritionist.response";
import { BaseApiPaginationResponse, BaseApiResponse } from "@common";
import { NutritionistSuccessMessage } from "@constant/message";

@Controller("public/nutritionist")
export class PublicNutritionistController {
	constructor(private readonly service: PublicNutritionistService) {}

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
		@Query() query: NutritionistIndexQuery,
	): Promise<IApiPaginationResponse<NutritionistResponse>> {
		const result = await this.service.paginateNutritionists(query);

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
		@Query() query: NutritionistIndexQuery,
	): Promise<IApiResponse<NutritionistResponse>> {
		const result = await this.service.getNutritionist(id, query);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_NUTRITIONIST,
			data: NutritionistResponse.fromEntity(result),
		});
	}
}
