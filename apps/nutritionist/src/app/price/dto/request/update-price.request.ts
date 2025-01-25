import { PriceValidationMessage } from "@constant/message";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class UpdatePriceRequest {
	@ApiProperty({
		example: 50_000,
	})
	@Min(50_000, {
		message: PriceValidationMessage.ERR_ONLINE_PRICE_MIN,
	})
	@Max(10_000_000, {
		message: PriceValidationMessage.ERR_ONLINE_PRICE_MAX,
	})
	@IsInt({
		message: PriceValidationMessage.ERR_ONLINE_PRICE_MUST_BE_NUMBER,
	})
	@IsNotEmpty({
		message: PriceValidationMessage.ERR_ONLINE_PRICE_REQUIRED,
	})
	online: number;

	@ApiProperty({
		example: 50_000,
	})
	@Min(50_000, {
		message: PriceValidationMessage.ERR_OFFLINE_PRICE_MIN,
	})
	@Max(10_000_000, {
		message: PriceValidationMessage.ERR_OFFLINE_PRICE_MAX,
	})
	@IsInt({
		message: PriceValidationMessage.ERR_OFFLINE_PRICE_MUST_BE_NUMBER,
	})
	@IsNotEmpty({
		message: PriceValidationMessage.ERR_OFFLINE_PRICE_REQUIRED,
	})
	offline: number;
}
