import { BaseApiResponse } from "@common";
import { NutritionistSuccessMessage } from "@constant/message";
import { IApiResponse, INutritionistEntity } from "@contract";
import { AccessTokenGuard, GetNutritionistLogged } from "@module/app-jwt";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { UriUtil } from "@util";
import { NutritionistUpdatePriceRequest } from "../dto/request/nutritionist-update-price.request";
import { NutritionistPriceResponse } from "../dto/response/nutritionist-price.response";
import { NutritionistPriceService } from "../service/nutritionist-price.service";

@UseGuards(AccessTokenGuard)
@Controller(UriUtil.uriFromRoleBase(AccountRole.NUTRITIONIST, "price"))
export class NutritionistPriceController {
	constructor(private readonly service: NutritionistPriceService) {}

	/**
	 * Retrieves the price information associated with the currently logged-in nutritionist.
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of price information
	 *
	 */
	@Get()
	async getPrice(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<NutritionistPriceResponse>> {
		const result = await this.service.getPriceByNutritionistId(nutritionist.id);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_GET_PRICE,
			data: NutritionistPriceResponse.fromEntity(result),
		});
	}

	/**
	 *
	 * Updates the price information associated with the currently logged-in nutritionist.
	 *
	 * Request body:
	 * - online: (required) int number
	 * - offline: (required) int number
	 *
	 * Response:
	 * - status: string
	 * - statusCode: number
	 * - message: string
	 * - data: object of updated price information
	 *
	 */
	@Put()
	async updatePrice(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: NutritionistUpdatePriceRequest,
	): Promise<IApiResponse<NutritionistPriceResponse>> {
		const result = await this.service.updatePrice(nutritionist.id, reqBody);

		return BaseApiResponse.success({
			message: NutritionistSuccessMessage.SUCCESS_UPDATE_PRICE,
			data: NutritionistPriceResponse.fromEntity(result),
		});
	}
}
