import { PrismaSelector, PrismaService } from "@config/prisma";
import { IAccountEntity, IPatientEntity, IProfileEntity } from "@contract";
import { IDeviceInfoEntity } from "@contract/entities/device-info.entity.interface";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

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

	/**
	 * Creates a new patient account.
	 *
	 * @param email - The email of the account to create.
	 * @param password - The password of the account to create.
	 * @param profile - The profile of the patient to create.
	 * @param fcmToken - The FCM token of the device associated with the account.
	 * @returns A promise that resolves to the created patient object.
	 */
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
							...PrismaSelector.PATIENT_WITH_PROFILE,
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

	/**
	 * Updates the image key for a patient's profile.
	 *
	 * @param id - The unique identifier of the patient.
	 * @param key - The new image key to be set for the patient's profile.
	 * @returns A promise that resolves to the updated patient object.
	 */
	async updateImageKey(id: string, key: string): Promise<IPatientEntity> {
		return this.prisma.patient
			.update({
				where: {
					id,
				},
				data: {
					profile: {
						update: {
							imageKey: key,
						},
					},
				},
				select: {
					...PrismaSelector.PATIENT_WITH_PROFILE,
					account: {
						select: PrismaSelector.ACCOUNT,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
