import { ApiOperationOptions } from "@nestjs/swagger";

export abstract class PriceOperationDocs {
	static readonly GET_PRICE: ApiOperationOptions = {
		summary: "Get price",
		description:
			"Retrieves the price information associated with the currently logged-in nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of price information",
	};

	static readonly UPDATE_PRICE: ApiOperationOptions = {
		summary: "Update price",
		description:
			"Updates the price information associated with the currently logged-in nutritionist.\n\nRequest body:\n- online: (required) int number\n- offline: (required) int number\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated price information",
	};
}
