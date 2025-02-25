import { PrismaSelector, PrismaService } from "@config/prisma";
import { Injectable } from "@nestjs/common";
import { IAccountEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";

@Injectable()
export class PatientAuthRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Finds an account by email.
	 *
	 * @param email - The email of the account to find.
	 * @returns A promise that resolves to the found account, including the password and associated patient.
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
					patient: {
						select: PrismaSelector.PATIENT_WITH_PROFILE,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Finds an account by ID.
	 *
	 * @param id - The ID of the account to find.
	 * @returns A promise that resolves to the found account, including the password and associated patient.
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
					patient: {
						select: PrismaSelector.PATIENT_WITH_PROFILE,
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
					patient: {
						select: PrismaSelector.PATIENT_WITH_PROFILE,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
