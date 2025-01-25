import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity } from "@contract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Retrieves an account entity associated with a given nutritionist ID.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose account is to be retrieved.
	 * @returns A promise that resolves to the account entity associated with the given nutritionist ID.
	 */
	async getAccountByNutritionistId(
		nutritionistId: string,
	): Promise<IAccountEntity> {
		return this.prisma.account.findFirst({
			where: {
				nutritionist: {
					id: nutritionistId,
				},
			},
			select: {
				...PrismaSelector.ACCOUNT,
				createdAt: true,
				updatedAt: true,
			},
		});
	}
}
