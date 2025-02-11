import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistForgetPasswordRepository {
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
					refreshToken: true,
					deviceInfo: {
						select: PrismaSelector.DEVICE_INFO,
					},
					nutritionist: {
						select: PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Updates the password of an account with the given ID.
	 *
	 * @param id - The unique identifier of the account.
	 * @param password - The new password to be set for the account.
	 * @returns A promise that resolves to the updated account object.
	 */
	async updatePassword(id: string, password: string): Promise<IAccountEntity> {
		return this.prisma.account
			.update({
				where: {
					id,
				},
				data: {
					password,
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
