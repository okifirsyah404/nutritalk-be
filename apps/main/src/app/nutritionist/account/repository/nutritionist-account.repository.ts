import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistAccountRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Retrieves an account entity associated with a given nutritionist ID.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose account is to be retrieved.
	 * @returns A promise that resolves to the account entity associated with the given nutritionist ID.
	 */
	async findAccountByNutritionistId(
		nutritionistId: string,
	): Promise<IAccountEntity> {
		return this.prisma.account
			.findFirst({
				where: {
					nutritionist: {
						id: nutritionistId,
					},
				},
				select: {
					...PrismaSelector.ACCOUNT,
					lastActivity: true,
					createdAt: true,
					updatedAt: true,
					sso: {
						select: PrismaSelector.SINGLE_SIGN_ON,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
