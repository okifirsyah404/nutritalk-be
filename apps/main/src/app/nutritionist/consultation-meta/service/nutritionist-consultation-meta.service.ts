import { NutritionistErrorMessage } from "@constant/message";
import { IConsultationMetaEntity } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { NutritionistConsultationMetaRepository } from "../repository/nutritionist-consultation-meta.repository";

@Injectable()
export class NutritionistConsultationMetaService {
	constructor(
		private readonly repository: NutritionistConsultationMetaRepository,
	) {}

	/**
	 * Retrieves the consultation metadata for a given nutritionist by their ID.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @returns A promise that resolves to the consultation metadata entity.
	 * @throws NotFoundException - If no consultation metadata is found for the given nutritionist ID.
	 */
	async getConsultationMetaByNutritionistId(
		nutritionistId: string,
	): Promise<IConsultationMetaEntity> {
		const result =
			await this.repository.findConsultationMetaByNutritionistId(
				nutritionistId,
			);

		if (!result) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_CONSULTATION_META_NOT_FOUND,
			);
		}

		return result;
	}
}
