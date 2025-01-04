import { IAccountEntity, PrismaService } from "@database/prisma";
import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Finds an account by email.
	 *
	 * @param email - The email of the account to find.
	 * @returns A promise that resolves to the found account, including the password and associated nutritionist.
	 */
	async findAccountByEmail(email: string): Promise<IAccountEntity> {
		return this.prisma.account.findUnique({
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
		});
	}

	/**
	 * Finds an account by ID.
	 *
	 * @param id - The ID of the account to find.
	 * @returns A promise that resolves to the found account, including the password and associated nutritionist.
	 */
	async findAccountById(id: string): Promise<IAccountEntity> {
		return this.prisma.account.findUnique({
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
		});
	}

	/**
	 * Updates the FCM token for a specific account.
	 *
	 * @param id - The ID of the account.
	 * @param fcmToken - The new FCM token to be set.
	 * @returns A promise that resolves to the updated account.
	 */
	async updateFcmToken(id: string, fcmToken: string): Promise<IAccountEntity> {
		return this.prisma.account.update({
			where: {
				id,
			},
			data: {
				fcmToken,
			},
		});
	}

	/**
	 * Updates the password of an account with the given ID.
	 *
	 * @param id - The unique identifier of the account.
	 * @param password - The new password to be set for the account.
	 * @returns A promise that resolves to the updated account object.
	 */
	async updatePassword(id: string, password: string): Promise<IAccountEntity> {
		return this.prisma.account.update({
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
		});
	}
}
