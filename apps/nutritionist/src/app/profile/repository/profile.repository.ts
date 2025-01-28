import { PrismaSelector, PrismaService } from "@config/prisma";
import { INutritionistEntity, IProfileEntity } from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfileRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Retrieves a nutritionist profile by its unique identifier.
	 *
	 * @param id - The unique identifier of the nutritionist profile.
	 * @returns A promise that resolves to the nutritionist profile object.
	 */
	async getProfileById(id: string): Promise<INutritionistEntity> {
		return this.prisma.nutritionist
			.findUnique({
				where: {
					id: id,
				},
				select: {
					...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					account: {
						select: PrismaSelector.ACCOUNT,
					},
					consultationMeta: {
						select: PrismaSelector.CONSULTATION_META,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Updates the profile of a nutritionist.
	 *
	 * @param {Object} params - The parameters for updating the profile.
	 * @param {string} params.id - The ID of the nutritionist.
	 * @param {string} params.name - The name of the nutritionist.
	 * @param {string} params.phoneNumber - The phone number of the nutritionist.
	 * @param {string} params.address - The address of the nutritionist.
	 * @param {string} params.placeOfBirth - The place of birth of the nutritionist.
	 * @param {Date} params.dateOfBirth - The date of birth of the nutritionist.
	 * @param {number} params.age - The age of the nutritionist.
	 * @returns {Promise<INutritionistEntity>} A promise that resolves to the updated nutritionist profile.
	 */
	async updateProfile({
		id,
		name,
		phoneNumber,
		address,
		placeOfBirth,
		dateOfBirth,
		age,
	}: Partial<IProfileEntity>): Promise<INutritionistEntity> {
		return this.prisma.nutritionist
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
					...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					account: {
						select: PrismaSelector.ACCOUNT,
					},
					consultationMeta: {
						select: PrismaSelector.CONSULTATION_META,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Updates the image key for a nutritionist's profile.
	 *
	 * @param id - The unique identifier of the nutritionist.
	 * @param key - The new image key to be set for the nutritionist's profile.
	 * @returns A promise that resolves to the updated nutritionist object.
	 */
	async updateImageKey(id: string, key: string): Promise<INutritionistEntity> {
		return this.prisma.nutritionist
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
					...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					account: {
						select: PrismaSelector.ACCOUNT,
					},
					consultationMeta: {
						select: PrismaSelector.CONSULTATION_META,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Updates the availability status of a nutritionist.
	 *
	 * @param id - The unique identifier of the nutritionist.
	 * @param isAvailable - The new availability status to be set.
	 * @returns A promise that resolves to the updated nutritionist entity.
	 */
	async setIsAvailable(
		id: string,
		isAvailable: boolean,
	): Promise<INutritionistEntity> {
		return this.prisma.nutritionist
			.update({
				where: {
					id,
				},
				data: {
					isAvailable,
				},
				select: {
					...PrismaSelector.NUTRITIONIST_WITH_PROFILE,
					account: {
						select: PrismaSelector.ACCOUNT,
					},
					consultationMeta: {
						select: PrismaSelector.CONSULTATION_META,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
