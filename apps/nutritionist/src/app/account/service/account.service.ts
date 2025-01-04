import { SetCache } from "@cache/app-cache/decorator/cache-result.decorator";
import { AuthErrorMessage } from "@common/constant/message/error/auth-error.message";
import { IAccountEntity } from "@database/prisma";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountRepository } from "../repository/account.repository";

@Injectable()
export class AccountService {
	constructor(private readonly repository: AccountRepository) {}

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
			await this.repository.getAccountByNutritionistId(nutritionistId);

		if (!result) {
			throw new NotFoundException(AuthErrorMessage.ERR_ACCOUNT_NOT_FOUND);
		}

		return result;
	}
}
