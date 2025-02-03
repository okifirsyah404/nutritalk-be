import { RefreshCache, SetCache } from "@config/app-cache";
import { PriceErrorMessage } from "@constant/message";
import { IPriceEntity } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { NutritionistPriceRepository } from "../repository/nutritionist-price.repository";

@Injectable()
export class NutritionistPriceService {
	constructor(private readonly repository: NutritionistPriceRepository) {}

	/**
	 * Retrieves the price entity associated with a given nutritionist ID.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose price entity is to be retrieved.
	 * @returns A promise that resolves to the price entity associated with the given nutritionist ID.
	 * @throws NotFoundException if no price entity is found for the given nutritionist ID.
	 */
	@SetCache<IPriceEntity>((nutritionistId: string) => `price:${nutritionistId}`)
	async getPriceByNutritionistId(
		nutritionistId: string,
	): Promise<IPriceEntity> {
		const result =
			await this.repository.findPriceByNutritionistId(nutritionistId);

		if (!result) {
			throw new NotFoundException(PriceErrorMessage.ERR_PRICE_NOT_FOUND);
		}

		return result;
	}

	/**
	 * Updates the price details for a given nutritionist.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose price details are to be updated.
	 * @param reqData - The request data containing the new price details.
	 * @returns A promise that resolves to the updated price entity.
	 * @throws NotFoundException - If no price is found for the given nutritionist ID.
	 */
	@RefreshCache((nutritionistId: string) => `price:${nutritionistId}`)
	async updatePrice(
		nutritionistId: string,
		reqData: Partial<Pick<IPriceEntity, "online" | "offline">>,
	): Promise<IPriceEntity> {
		const price =
			await this.repository.findPriceByNutritionistId(nutritionistId);

		if (!price) {
			throw new NotFoundException(PriceErrorMessage.ERR_PRICE_NOT_FOUND);
		}

		return this.repository.updatePrice({
			priceId: price.id,
			online: reqData.online,
			offline: reqData.offline,
		});
	}
}
