import { RefreshCache, SetCache } from "@config/app-cache";
import { AppS3StorageService } from "@config/s3storage";
import { ProfileErrorMessage } from "@constant/message";
import { INutritionistEntity, IProfileEntity } from "@contract";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DateUtil, GeneralUtil, PhoneNumberUtil } from "@util";
import { NutritionistProfileRepository } from "../repository/nutritionist-profile.repository";

@Injectable()
export class NutritionistProfileService {
	constructor(
		private readonly repository: NutritionistProfileRepository,
		private readonly s3Service: AppS3StorageService,
		private readonly dateUtil: DateUtil,
		private readonly phoneNumberUtil: PhoneNumberUtil,
		private readonly generalUtil: GeneralUtil,
	) {}

	private readonly logger = new Logger(NutritionistProfileService.name);

	/**
	 * Retrieves a nutritionist profile by its ID.
	 *
	 * @param {string} id - The ID of the nutritionist profile to retrieve.
	 * @returns {Promise<INutritionistEntity>} A promise that resolves to the nutritionist profile.
	 * @throws {NotFoundException} If the profile is not found.
	 */
	@SetCache<INutritionistEntity>((id: string) => `profile:${id}`, {
		ttl: 10,
		unit: "minutes",
	})
	async getProfileById(id: string): Promise<INutritionistEntity> {
		const result = await this.repository.findProfileById(id);

		if (!result) {
			throw new NotFoundException(ProfileErrorMessage.ERR_PROFILE_NOT_FOUND);
		}

		result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

		return result;
	}

	/**
	 * Updates the profile of a nutritionist.
	 *
	 * @param nutritionist - The nutritionist whose profile is to be updated.
	 * @param reqData - The data to update the profile with.
	 * @returns A promise that resolves to the updated nutritionist profile.
	 * @throws NotFoundException - If the profile is not found.
	 */
	@RefreshCache(
		(nutritionist: INutritionistEntity) => `profile:${nutritionist.id}`,
		{
			ttl: 10,
			unit: "minutes",
		},
	)
	async updateProfile(
		nutritionist: INutritionistEntity,
		reqData: Partial<IProfileEntity>,
	): Promise<INutritionistEntity> {
		const result = await this.repository.updateProfile({
			id: nutritionist.id,
			name: reqData.name,
			address: reqData.address,
			phoneNumber: this.generalUtil.simpleTernaryTransform(
				reqData.phoneNumber,
				(value) => this.phoneNumberUtil.transformToLocalePhoneNumber(value),
			),
			dateOfBirth: reqData.dateOfBirth,
			placeOfBirth: reqData.placeOfBirth,
			age: await this.generalUtil.simpleTernaryTransformAsync(
				reqData.dateOfBirth,
				async (value) => (await this.dateUtil.countAge(value)).year,
			),
		});

		if (!result) {
			throw new NotFoundException(ProfileErrorMessage.ERR_PROFILE_NOT_FOUND);
		}

		result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

		return result;
	}

	/**
	 * Uploads a profile image for a nutritionist, updates the image key in the repository,
	 * and retrieves the signed URL for the profile image.
	 *
	 * @param nutritionist - The nutritionist whose profile image is being uploaded.
	 * @param file - The image file to be uploaded.
	 * @returns A promise that resolves to the updated nutritionist profile.
	 * @throws NotFoundException - If the profile is not found in the repository.
	 */
	@RefreshCache(
		(nutritionist: INutritionistEntity) => `profile:${nutritionist.id}`,
		{
			ttl: 10,
			unit: "minutes",
		},
	)
	async uploadProfile(
		nutritionist: INutritionistEntity,
		file: Express.Multer.File,
	): Promise<INutritionistEntity> {
		const key = await this.s3Service.uploadProfileImage({
			seed: nutritionist.id,
			role: nutritionist.account.role.accountRole,
			file: file,
		});

		const result = await this.repository.updateImageKey(nutritionist.id, key);

		if (!result) {
			throw new NotFoundException(ProfileErrorMessage.ERR_PROFILE_NOT_FOUND);
		}

		result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

		return result;
	}

	/**
	 * Sets the availability of a nutritionist.
	 *
	 * @param id - The ID of the nutritionist whose availability is to be set.
	 * @returns A promise that resolves to the updated nutritionist profile.
	 * @throws NotFoundException - If the profile is not
	 * found in the repository.
	 *
	 */
	@RefreshCache((id: string) => `profile:${id}`, {
		ttl: 10,
		unit: "minutes",
	})
	async setNutritionistAvailability(id: string): Promise<INutritionistEntity> {
		const nutritionist = await this.getProfileById(id);

		const result = await this.repository.updateAvailability(
			id,
			!nutritionist.isAvailable,
		);

		if (!result) {
			throw new NotFoundException(ProfileErrorMessage.ERR_PROFILE_NOT_FOUND);
		}

		result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

		return result;
	}
}
