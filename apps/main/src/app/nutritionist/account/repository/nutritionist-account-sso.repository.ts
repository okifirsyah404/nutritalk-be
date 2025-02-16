import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity, INutritionistEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistAccountSSORepository {
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
					sso: {
						select: PrismaSelector.SINGLE_SIGN_ON,
					},
					lastActivity: true,
					createdAt: true,
					updatedAt: true,
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async updateNutritionistEmail(
		nutritionistId: string,
		email: string,
	): Promise<INutritionistEntity> {
		return this.prisma.nutritionist.update({
			where: {
				id: nutritionistId,
			},
			data: {
				account: {
					update: {
						email,
					},
				},
			},
			select: {
				...PrismaSelector.NUTRITIONIST,
				account: {
					select: PrismaSelector.ACCOUNT,
				},
			},
		});
	}
}
