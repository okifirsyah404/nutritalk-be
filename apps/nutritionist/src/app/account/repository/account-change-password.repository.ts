import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountChangePasswordRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Updates the password of an account with the given ID.
	 *
	 * @param {string} id - The ID of the account to update.
	 * @param {string} password - The new password to set for the account.
	 * @returns {Promise<IAccountEntity>} A promise that resolves to the updated account entity.
	 *
	 * @throws Will throw an error if the update operation fails.
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
