import { nullToUndefined } from "@common";
import { NutritionistValidationMessage } from "@constant/message";
import { IPriceEntity } from "@contract";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class NutritionistUpdatePriceRequest
	implements Partial<Pick<IPriceEntity, "online" | "offline">>
{
	/**
	 *
	 * Online price property.
	 *
	 * Decorators:
	 * - IsOptional
	 * - Min: 50_000
	 * - Max: 10_000_000
	 * - IsInt
	 *
	 */

	@ApiProperty({
		example: 50_000,
	})
	@Transform(nullToUndefined)
	@Min(50_000, {
		message: NutritionistValidationMessage.ERR_ONLINE_PRICE_MIN_50000,
	})
	@Max(10_000_000, {
		message: NutritionistValidationMessage.ERR_ONLINE_PRICE_MAX_10000000,
	})
	@IsInt({
		message: NutritionistValidationMessage.ERR_ONLINE_PRICE_MUST_BE_NUMBER,
	})
	@IsOptional()
	online?: number;

	/**
	 *
	 * Offline price property.
	 *
	 * Decorators:
	 * - IsOptional
	 * - Min: 50_000
	 * - Max: 10_000_000
	 * - IsInt
	 *
	 */
	@ApiProperty({
		example: 50_000,
	})
	@Transform(nullToUndefined)
	@Min(50_000, {
		message: NutritionistValidationMessage.ERR_OFFLINE_PRICE_MIN_50000,
	})
	@Max(10_000_000, {
		message: NutritionistValidationMessage.ERR_OFFLINE_PRICE_MAX_10000000,
	})
	@IsInt({
		message: NutritionistValidationMessage.ERR_OFFLINE_PRICE_MUST_BE_NUMBER,
	})
	@IsOptional()
	offline?: number;
}
