import { Injectable } from "@nestjs/common";
import { PrismaSelector, PrismaService } from "@config/prisma";
import { createDatabaseErrorHandler } from "@infrastructure";
import { IAccountEntity, IPatientEntity, IProfileEntity } from "@contract";
import { IDeviceInfoEntity } from "@contract/entities/device-info.entity.interface";

@Injectable()
export class PatientAuthRegisterRepository {
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

	async createPatientAccount(
		{ email, password }: Pick<IAccountEntity, "email" | "password">,
		profile: Omit<IProfileEntity, "id" | "imageKey" | "age">,
		{ fcmToken }: Pick<IDeviceInfoEntity, "fcmToken">,
	): Promise<IPatientEntity> {
		return this.prisma
			.$transaction(
				async (tx) => {
					const account = await tx.account.create({
						data: {
							email,
							password,
							lastActivity: new Date(),
							deviceInfo: {
								create: {
									fcmToken,
								},
							},
							role: {
								create: {
									accountRole: "PATIENT",
								},
							},
						},
						select: {
							...PrismaSelector.ACCOUNT,
							password: true,
						},
					});

					const patient = await tx.patient.create({
						data: {
							account: {
								connect: {
									id: account.id,
								},
							},
							profile: {
								create: {
									name: profile.name,
									gender: profile.gender,
									phoneNumber: profile.phoneNumber,
									address: profile.address,
									placeOfBirth: profile.placeOfBirth,
									dateOfBirth: profile.dateOfBirth,
									bio: profile.bio,
								},
							},
							credit: {
								create: {
									balance: 0,
								},
							},
						},
						select: {
							...PrismaSelector.PATIENT,
							account: {
								select: PrismaSelector.ACCOUNT,
							},
						},
					});

					return patient;
				},
				{
					isolationLevel: "Serializable",
				},
			)
			.catch(createDatabaseErrorHandler);
	}

	// /**
	//  * Creates a new account.
	//  *
	//  * @param account - The account to create.
	//  * @returns A promise that resolves to the created account.
	//  */
	// async createAccount({
	// 	email,
	// 	password,
	// }: Pick<IAccountEntity, "email" | "password">): Promise<IAccountEntity> {
	// 	return this.prisma.account
	// 		.create({
	// 			data: {
	// 				email,
	// 				password,
	// 				lastActivity: new Date(),
	// 			},
	// 			select: {
	// 				...PrismaSelector.ACCOUNT,
	// 				password: true,
	// 			},
	// 		})
	// 		.catch(createDatabaseErrorHandler);
	// }

	// async createPatient(
	// 	accountId: string,
	// 	profile: IProfileEntity,
	// ): Promise<IPatientEntity> {
	// 	return this.prisma.patient
	// 		.create({
	// 			data: {
	// 				account: {
	// 					connect: {
	// 						id: accountId,
	// 					},
	// 				},
	// 				profile: {
	// 					create: {
	// 						name: profile.name,
	// 						gender: profile.gender,
	// 						phoneNumber: profile.phoneNumber,
	// 						imageKey: profile.imageKey,
	// 						address: profile.address,
	// 						placeOfBirth: profile.placeOfBirth,
	// 						dateOfBirth: profile.dateOfBirth,
	// 						bio: profile.bio,
	// 						age: profile.age,
	// 					},
	// 				},
	// 				credit: {
	// 					create: {
	// 						balance: 0,
	// 					},
	// 				},
	// 			},
	// 		})
	// 		.catch(createDatabaseErrorHandler);
	// }
	//
	// async updateImageKey(
	// 	patientId: string,
	// 	imageKey: string,
	// ): Promise<IPatientEntity> {
	// 	return this.prisma.patient
	// 		.update({
	// 			where: {
	// 				id: patientId,
	// 			},
	// 			data: {
	// 				profile: {
	// 					update: {
	// 						imageKey,
	// 					},
	// 				},
	// 			},
	// 		})
	// 		.catch(createDatabaseErrorHandler);
	// }
	//
	// async updateFcmToken(id: string, fcmToken: string): Promise<IAccountEntity> {
	// 	return this.prisma.account
	// 		.update({
	// 			where: {
	// 				id,
	// 			},
	// 			data: {
	// 				deviceInfo: {
	// 					update: {
	// 						fcmToken,
	// 					},
	// 				},
	// 			},
	// 			select: {
	// 				...PrismaSelector.ACCOUNT,
	// 				password: true,
	// 				patient: {
	// 					select: PrismaSelector.PATIENT_WITH_PROFILE,
	// 				},
	// 			},
	// 		})
	// 		.catch(createDatabaseErrorHandler);
	// }
}
