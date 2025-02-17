import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NutritionistAuthSSORepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Retrieves an account entity associated with a given Google ID.
	 *
	 * @param googleId - The Google ID of the account to be retrieved.
	 * @returns A promise that resolves to the account entity associated with the given Google ID.
	 */
	async findAccountByGoogleId(googleId: string): Promise<IAccountEntity> {
		return this.prisma.account
			.findFirst({
				where: {
					sso: {
						googleSSO: {
							googleId,
						},
					},
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
					deviceInfo: {
						update: {
							fcmToken,
						},
					},
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
