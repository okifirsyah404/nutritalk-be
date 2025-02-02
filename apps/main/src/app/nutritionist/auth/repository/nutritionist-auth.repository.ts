import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistAuthRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Finds an account by email.
	 *
	 * @param email - The email of the account to find.
	 * @returns A promise that resolves to the found account, including the password and associated nutritionist.
	 */
	async findAccountByEmail(email: string): Promise<IAccountEntity> {
		return this.prisma.account
			.findUnique({
				where: {
					email: email,
				},
				select: {
					...PrismaSelector.ACCOUNT,
					password: true,
					nutritionist: {
						select: PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Finds an account by ID.
	 *
	 * @param id - The ID of the account to find.
	 * @returns A promise that resolves to the found account, including the password and associated nutritionist.
	 */
	async findAccountById(id: string): Promise<IAccountEntity> {
		return this.prisma.account
			.findUnique({
				where: {
					id,
				},
				select: {
					...PrismaSelector.ACCOUNT,
					password: true,
					fcmToken: true,
					refreshToken: true,
					nutritionist: {
						select: PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Updates the FCM token for a specific account.
	 *
	 * @param id - The ID of the account.
	 * @param fcmToken - The new FCM token to be set.
	 * @returns A promise that resolves to the updated account.
	 */
	async updateFcmToken(id: string, fcmToken: string): Promise<IAccountEntity> {
		return this.prisma.account
			.update({
				where: {
					id,
				},
				data: {
					fcmToken,
				},
				select: {
					...PrismaSelector.ACCOUNT,
					nutritionist: {
						select: PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
