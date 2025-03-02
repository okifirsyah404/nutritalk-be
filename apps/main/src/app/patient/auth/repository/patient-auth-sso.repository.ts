import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	IAccountEntity,
	IGoogleSSOEntity,
	IPatientEntity,
	IProfileEntity,
} from "@contract";
import { IDeviceInfoEntity } from "@contract/entities/device-info.entity.interface";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientAuthSSORepository {
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

	/**
	 * Creates a new patient account.
	 *
	 * @param email - The email of the account to create.
	 * @param password - The password of the account to create.
	 * @param googleId - The Google ID of the account to create.
	 * @param profile - The profile of the patient to create.
	 * @param fcmToken - The FCM token of the device associated with the account.
	 * @returns A promise that resolves to the created patient object.
	 */
	async createPatientAccount(
		{
			email,
			password,
			googleId,
		}: Pick<IAccountEntity, "email" | "password"> &
			Pick<IGoogleSSOEntity, "googleId">,
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
							sso: {
								create: {
									googleSSO: {
										create: {
											googleId,
											email,
										},
									},
								},
							},
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
