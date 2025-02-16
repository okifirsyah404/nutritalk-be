import { NutritionistErrorMessage } from "@constant/message";
import { INutritionistEntity } from "@contract";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { NutritionistCredentialRepository } from "../repository/nutritionist-credential.repository";

@Injectable()
export class NutritionistCredentialService {
	constructor(private readonly repository: NutritionistCredentialRepository) {}

	private readonly logger = new Logger(NutritionistCredentialService.name);

	async getNutritionist(nutritionistId: string): Promise<INutritionistEntity> {
		this.logger.debug(`getNutritionist: ${nutritionistId}`);

		const result = await this.repository.getNutritionist(nutritionistId);

		this.logger.debug(`getNutritionist: ${JSON.stringify(result)}`);

		if (!result) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_NUTRITIONIST_NOT_FOUND,
			);
		}

		return result;
	}

	async updateCredential(
		nutritionistId: string,
		data: Partial<Pick<INutritionistEntity, "nip" | "nidn">>,
	): Promise<INutritionistEntity> {
		return this.repository.updateCredential(nutritionistId, data);
	}
}
