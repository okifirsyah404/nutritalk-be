import { Injectable } from "@nestjs/common";
import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";

@Injectable()
export class PatientForgetPasswordRepository {
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
					lastActivity: new Date(),
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
