import { NutritionistErrorMessage } from "@constant/message";
import { IOccupationEntity } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { NutritionistOccupationRepository } from "../repository/nutritionist-occupation.repository";

@Injectable()
export class NutritionistOccupationService {
	constructor(private readonly repository: NutritionistOccupationRepository) {}

	/**
	 * Retrieves the occupation details of a nutritionist by their ID.
	 *
	 * @param {string} nutritionistId - The ID of the nutritionist whose occupation details are to be retrieved.
	 * @returns {Promise<IOccupationEntity>} A promise that resolves to the occupation entity of the nutritionist.
	 * @throws {NotFoundException} If no occupation is found for the given nutritionist ID.
	 */
	async getOccupation(nutritionistId: string): Promise<IOccupationEntity> {
		const result =
			await this.repository.findOccupationByNutritionistId(nutritionistId);

		if (!result) {
			throw new NotFoundException(
				NutritionistErrorMessage.OCCUPATION_NOT_FOUND,
			);
		}

		return result;
	}

	/**
	 * Updates the occupation details of a nutritionist.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose occupation details are to be updated.
	 * @param details - An object containing the occupation details to be updated.
	 * @param details.name - The name of the occupation.
	 * @param details.workPlace - The workplace of the nutritionist.
	 * @param details.experience - The experience of the nutritionist in years.
	 * @returns A promise that resolves to the updated occupation entity.
	 */
	async updateOccupationDetail(
		nutritionistId: string,
		{
			name,
			workPlace,
			experience,
		}: Partial<Pick<IOccupationEntity, "name" | "workPlace" | "experience">>,
	): Promise<IOccupationEntity> {
		return this.repository.updateOccupation(nutritionistId, {
			name,
			workPlace,
			experience,
		});
	}
}
