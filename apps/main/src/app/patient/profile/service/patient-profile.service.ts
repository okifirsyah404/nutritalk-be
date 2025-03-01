import { PatientProfileRepository } from "@app/app/patient/profile/repository/patient-profile.repository";
import { RefreshCache, SetCache } from "@config/app-cache";
import { AppS3StorageService } from "@config/s3storage";
import { ProfileErrorMessage } from "@constant/message";
import { IPatientEntity, IProfileEntity } from "@contract";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DateUtil, GeneralUtil, PhoneNumberUtil } from "@util";

@Injectable()
export class PatientProfileService {
	constructor(
		private readonly repository: PatientProfileRepository,
		private readonly s3Service: AppS3StorageService,
		private readonly dateUtil: DateUtil,
		private readonly phoneNumberUtil: PhoneNumberUtil,
		private readonly generalUtil: GeneralUtil,
	) {}

	private readonly logger = new Logger(PatientProfileService.name);

	/**
	 * Retrieves a patient profile by its ID.
	 *
	 * @param {string} id - The ID of the patient profile to retrieve.
	 * @returns {Promise<IPatientEntity>} A promise that resolves to the patient profile.
	 * @throws {NotFoundException} If the profile is not found.
	 */
	@SetCache<IPatientEntity>((id: string) => `profile:${id}`, {
		ttl: 10,
		unit: "minutes",
	})
	async getProfileById(id: string): Promise<IPatientEntity> {
		const result = await this.repository.findProfileById(id);

		if (!result) {
			throw new NotFoundException(ProfileErrorMessage.ERR_PROFILE_NOT_FOUND);
		}

		result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

		return result;
	}

	/**
	 * Updates the profile of a patient.
	 *
	 * @param patient - The patient whose profile is to be updated.
	 * @param reqData - The data to update the profile with.
	 * @returns A promise that resolves to the updated patient profile.
	 * @throws NotFoundException - If the profile is not found.
	 */
	@RefreshCache((patient: IPatientEntity) => `profile:${patient.id}`, {
		ttl: 10,
		unit: "minutes",
	})
	async updateProfile(
		patient: IPatientEntity,
		reqData: Partial<IProfileEntity>,
	): Promise<IPatientEntity> {
		const result = await this.repository.updateProfile({
			id: patient.id,
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
	 * Uploads a profile image for a patient, updates the image key in the repository,
	 * and retrieves the signed URL for the profile image.
	 *
	 * @param patient - The patient whose profile image is being uploaded.
	 * @param file - The image file to be uploaded.
	 * @returns A promise that resolves to the updated patient profile.
	 * @throws NotFoundException - If the profile is not found in the repository.
	 */
	@RefreshCache((patient: IPatientEntity) => `profile:${patient.id}`, {
		ttl: 10,
		unit: "minutes",
	})
	async uploadProfile(
		patient: IPatientEntity,
		file: Express.Multer.File,
	): Promise<IPatientEntity> {
		const key = await this.s3Service.uploadProfileImage({
			seed: patient.id,
			role: patient.account.role.accountRole,
			file: file,
		});

		const result = await this.repository.updateImageKey(patient.id, key);

		if (!result) {
			throw new NotFoundException(ProfileErrorMessage.ERR_PROFILE_NOT_FOUND);
		}

		result.profile = await this.s3Service.getProfileSignedUrl(result.profile);

		return result;
	}
}
