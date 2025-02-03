import { SetCache } from "@config/app-cache";
import { AccountErrorMessage } from "@constant/message";
import { IAccountEntity } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { NutritionistAccountRepository } from "../repository/nutritionist-account.repository";

@Injectable()
export class NutritionistAccountService {
	constructor(private readonly repository: NutritionistAccountRepository) {}

	/**
	 * Retrieves the account information associated with a given nutritionist ID.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @returns A promise that resolves to the account entity associated with the given nutritionist ID.
	 */
	@SetCache((nutritionistId: string) => `account:${nutritionistId}`)
	async getAccountByNutritionistId(
		nutritionistId: string,
	): Promise<IAccountEntity> {
		const result =
			await this.repository.findAccountByNutritionistId(nutritionistId);

		if (!result) {
			throw new NotFoundException(AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		return result;
	}
}
