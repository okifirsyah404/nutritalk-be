import { S3StorageService } from "@config/s3storage";
import { NutritionistErrorMessage } from "@constant/message";
import { INutritionistEntity, IPaginationResult } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { NutritionistIndexQuery } from "../dto/query/nutritionist-index.query";
import { NutritionistRepository } from "../repository/nutritionist.repository";

@Injectable()
export class NutritionistService {
	constructor(
		private readonly repository: NutritionistRepository,
		private readonly storageService: S3StorageService,
	) {}

	/**
	 * Paginates the list of nutritionists based on the provided query and nutritionist ID.
	 *
	 * @param nutritionistId - The ID of the nutritionist to paginate.
	 * @param query - The query parameters for pagination.
	 * @returns A promise that resolves to an object containing pagination details and the list of formatted nutritionist entities.
	 */
	async paginateNutritionists(
		nutritionistId: string,
		query: NutritionistIndexQuery,
	): Promise<IPaginationResult<INutritionistEntity>> {
		const result = await this.repository.paginate(nutritionistId, query);

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
	 * @returns {Promise<INutritionistEntity>} A promise that resolves to the nutritionist entity.
	 * @throws {NotFoundException} If the nutritionist is not found.
	 */
	async getNutritionist(
		nutritionistId: string,
		query: NutritionistIndexQuery,
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
