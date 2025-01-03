import { BaseApiResponse } from "@common/response/base-api.response";
import { IApiResponse } from "@contract/response/api-response.interface";
import { INutritionistEntity } from "@database/prisma";
import { AccessTokenGuard } from "@jwt/app-jwt";
import GetNutritionistLogged from "@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { PriceSuccessMessage } from "@nutritionist/common/constant/message/success/price-success.message";
import { DocsTag } from "@nutritionist/common/docs/docs";
import { PriceContentDocs } from "../docs/content/price.content";
import { PriceOperationDocs } from "../docs/price.operation";
import { UpdatePriceRequest } from "../dto/request/update-price.request";
import { PriceResponse } from "../dto/response/price.response";
import { PriceService } from "../service/price.service";

@ApiTags(DocsTag.PRICE)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
	content: PriceContentDocs.UNAUTHORIZED,
})
@UseGuards(AccessTokenGuard)
@Controller("price")
export class PriceController {
	constructor(private readonly priceService: PriceService) {}

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
	@ApiOperation(PriceOperationDocs.GET_PRICE)
	@ApiOkResponse({
		content: PriceContentDocs.SUCCESS_GET_PRICE,
	})
	@ApiNotFoundResponse({
		content: PriceContentDocs.NOT_FOUND,
	})
	@Get()
	async getPrice(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
	): Promise<IApiResponse<PriceResponse>> {
		const result = await this.priceService.getPriceByNutritionistId(
			nutritionist.id,
		);

		return BaseApiResponse.success({
			message: PriceSuccessMessage.SUCCESS_GET_PRICE,
			data: PriceResponse.fromEntity(result),
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
	@ApiOperation(PriceOperationDocs.UPDATE_PRICE)
	@ApiOkResponse({
		content: PriceContentDocs.SUCCESS_UPDATE_PRICE,
	})
	@ApiNotFoundResponse({
		content: PriceContentDocs.NOT_FOUND,
	})
	@Put()
	async updatePrice(
		@GetNutritionistLogged() nutritionist: INutritionistEntity,
		@Body() reqBody: UpdatePriceRequest,
	): Promise<IApiResponse<PriceResponse>> {
		const result = await this.priceService.updatePrice(
			nutritionist.id,
			reqBody,
		);

		return BaseApiResponse.success({
			message: PriceSuccessMessage.SUCCESS_UPDATE_PRICE,
			data: PriceResponse.fromEntity(result),
		});
	}
}
