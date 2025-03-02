import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	IAccountEntity,
	IGoogleSSOEntity,
	ISingleSignOnEntity,
} from "@contract";
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

	/**
	 * Updates the email address associated with a given account.
	 *
	 * @param accountId - The ID of the account to be updated.
	 * @param email - The new email address to be set.
	 * @returns A promise that resolves to the updated account entity.
	 */
	async updateEmail(accountId: string, email: string): Promise<IAccountEntity> {
		return this.prisma.account
			.update({
				where: {
					id: accountId,
				},
				data: {
					email,
					lastActivity: new Date(),
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

	/**
	 * Retrieves a single sign-on entity associated with a given account ID.
	 *
	 * @param accountId - The ID of the account whose single sign-on entity is to be retrieved.
	 * @returns A promise that resolves to the single sign-on entity associated with the given account ID.
	 */
	async findSSOByAccountId(accountId: string): Promise<ISingleSignOnEntity> {
		return this.prisma.singleSignOn.findUnique({
			where: {
				accountId,
			},
			select: PrismaSelector.SINGLE_SIGN_ON,
		});
	}

	/**
	 * Retrieves a single sign-on entity associated with a given Google ID.
	 *
	 * @param googleId - The Google ID associated with the single sign-on entity to be retrieved.
	 * @returns A promise that resolves to the single sign-on entity associated with the given Google ID.
	 */
	async findSSOByGoogleId(googleId: string): Promise<ISingleSignOnEntity> {
		return this.prisma.singleSignOn.findFirst({
			where: {
				googleSSO: {
					googleId,
				},
			},
			select: PrismaSelector.SINGLE_SIGN_ON,
		});
	}

	/**
	 * Retrieves a single sign-on entity associated with a given email address.
	 *
	 * @param email - The email address associated with the single sign-on entity to be retrieved.
	 * @returns A promise that resolves to the single sign-on entity associated with the given email address.
	 */
	async findSSOByEmail(email: string): Promise<ISingleSignOnEntity> {
		return this.prisma.singleSignOn.findFirst({
			where: {
				googleSSO: {
					email,
				},
			},
			select: PrismaSelector.SINGLE_SIGN_ON,
		});
	}

	/**
	 * Creates a single sign-on entity associated with a given account ID.
	 *
	 * @param accountId - The ID of the account to be associated with the single sign-on entity.
	 * @returns A promise that resolves to the created single sign-on entity.
	 */
	async createSSO(accountId: string): Promise<ISingleSignOnEntity> {
		return this.prisma.singleSignOn.create({
			data: {
				account: {
					connect: {
						id: accountId,
					},
				},
			},
			select: PrismaSelector.SINGLE_SIGN_ON,
		});
	}

	/**
	 * Creates a Google SSO entity associated with a given account ID.
	 *
	 * @param accountId - The ID of the account to be associated with the Google SSO entity.
	 * @param data - The data to be used to create the Google SSO entity.
	 * @returns A promise that resolves to the updated account entity.
	 */
	async createGoogleSSO(
		accountId: string,
		data: Pick<IGoogleSSOEntity, "googleId" | "email">,
	): Promise<IAccountEntity> {
		return this.prisma.account
			.update({
				where: {
					id: accountId,
				},
				data: {
					sso: {
						update: {
							googleSSO: {
								create: data,
							},
						},
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
