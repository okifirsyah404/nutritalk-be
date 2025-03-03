import { Injectable } from "@nestjs/common";
import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";

@Injectable()
export class PatientAccountRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Retrieves an account entity associated with a given patient ID.
	 *
	 * @param patientId - The ID of the patient whose account is to be retrieved.
	 * @returns A promise that resolves to the account entity associated with the given patient ID.
	 */
	async findAccountByPatientId(patientId: string): Promise<IAccountEntity> {
		return this.prisma.account
			.findFirst({
				where: {
					patient: {
						id: patientId,
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
