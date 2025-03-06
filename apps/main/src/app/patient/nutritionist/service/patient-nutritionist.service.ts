import { Injectable, NotFoundException } from "@nestjs/common";
import { PatientNutritionistRepository } from "@app/app/patient/nutritionist/repository/patient-nutritionist.repository";
import { S3StorageService } from "@config/s3storage";
import { PatientNutritionistIndexQuery } from "@app/app/patient/nutritionist/dto/query/patient-nutritionist-index.query";
import { INutritionistEntity, IPaginationResult } from "@contract";
import { NutritionistErrorMessage } from "@constant/message";

@Injectable()
export class PatientNutritionistService {
	constructor(
		private readonly repository: PatientNutritionistRepository,
		private readonly storageService: S3StorageService,
	) {}

	/**
	 * Paginates the list of nutritionists based on the provided query and nutritionist ID.
	 *
	 * @param query - The query parameters for pagination.
	 * @returns A promise that resolves to an object containing pagination details and the list of formatted nutritionist entities.
	 */
	async paginateNutritionists(
		query: PatientNutritionistIndexQuery,
	): Promise<IPaginationResult<INutritionistEntity>> {
		const result = await this.repository.paginate(query);

		const formattedData: INutritionistEntity[] = await Promise.all(
			result.items.map(async (item) => {
				return {
					...item,
					profile: {
						...item.profile,
						imageKey: await this.storageService.getSignedUrl(
							item.profile.imageKey,
						),
					},
				};
			}),
		);

		return {
			pagination: result.pagination,
			items: formattedData,
		};
	}

	/**
	 * Retrieves a nutritionist by their ID.
	 *
	 * @param {string} nutritionistId - The ID of the nutritionist to retrieve.
	 * @param {PatientNutritionistIndexQuery} query - The query parameters for the nutritionist.
	 * @returns {Promise<INutritionistEntity>} A promise that resolves to the nutritionist entity.
	 * @throws {NotFoundException} If the nutritionist is not found.
	 */
	async getNutritionist(
		nutritionistId: string,
		query: PatientNutritionistIndexQuery,
	): Promise<INutritionistEntity> {
		const result = await this.repository.getNutritionistById(
			nutritionistId,
			query,
		);

		if (!result) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_NUTRITIONIST_NOT_FOUND,
			);
		}

		return {
			...result,
			profile: {
				...result.profile,
				imageKey: await this.storageService.getSignedUrl(
					result.profile.imageKey,
				),
			},
		};
	}
}
