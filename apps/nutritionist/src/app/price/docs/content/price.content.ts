import { BaseApiResponse } from "@common/response/base-api.response";
import {
	INVALID_TOKEN_CONTENT,
	PriceErrorMessage,
	PriceSuccessMessage,
} from "@constant/constant";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { PriceResponse } from "../../dto/response/price.response";

export abstract class PriceContentDocs {
	static readonly SUCCESS_GET_PRICE: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: PriceSuccessMessage.SUCCESS_GET_PRICE,
				data: PriceResponse.exampleData,
			}),
		},
	};

	static readonly SUCCESS_UPDATE_PRICE: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: PriceSuccessMessage.SUCCESS_UPDATE_PRICE,
				data: PriceResponse.exampleData,
			}),
		},
	};

	static readonly NOT_FOUND: ContentObject = {
		"application/json": {
			example: BaseApiResponse.notFound({
				message: PriceErrorMessage.ERR_PRICE_NOT_FOUND,
			}),
		},
	};

	static readonly UNAUTHORIZED: ContentObject = {
		"application/json": {
			examples: {
				...INVALID_TOKEN_CONTENT,
			},
		},
	};
}
