import { PrismaSelector, PrismaService } from "@config/prisma";
import { IPatientEntity, IProfileEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientProfileRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Retrieves a patient profile by its unique identifier.
	 *
	 * @param id - The unique identifier of the patient profile.
	 * @returns A promise that resolves to the patient profile object.
	 */
	async findProfileById(id: string): Promise<IPatientEntity> {
		return this.prisma.patient
			.findUnique({
				where: {
					id: id,
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

	/**
	 * Updates the profile of a patient.
	 *
	 * @param {Object} params - The parameters for updating the profile.
	 * @param {string} params.id - The ID of the patient.
	 * @param {string} params.name - The name of the patient.
	 * @param {string} params.phoneNumber - The phone number of the patient.
	 * @param {string} params.address - The address of the patient.
	 * @param {string} params.placeOfBirth - The place of birth of the patient.
	 * @param {Date} params.dateOfBirth - The date of birth of the patient.
	 * @param {number} params.age - The age of the patient.
	 * @returns {Promise<IPatientEntity>} A promise that resolves to the updated patient profile.
	 */
	async updateProfile({
		id,
		name,
		phoneNumber,
		address,
		placeOfBirth,
		dateOfBirth,
		age,
	}: Partial<IProfileEntity>): Promise<IPatientEntity> {
		return this.prisma.patient
			.update({
				where: {
					id,
				},
				data: {
					profile: {
						update: {
							name,
							phoneNumber,
							address,
							placeOfBirth,
							dateOfBirth,
							age,
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
