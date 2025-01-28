import { OccupationErrorMessage } from "@constant/message";
import { IOccupationEntity } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { OccupationRepository } from "../repository/occupation.repository";

@Injectable()
export class OccupationService {
	constructor(private readonly repository: OccupationRepository) {}

	async getOccupation(nutritionistId: string): Promise<IOccupationEntity> {
		const result = await this.repository.getOccupation(nutritionistId);

		if (!result) {
			throw new NotFoundException(OccupationErrorMessage.OCCUPATION_NOT_FOUND);
		}

		return result;
	}

	async updateOccupationDetail(
		nutritionistId: string,
		{ name, workPlace, experience }: Partial<IOccupationEntity>,
	): Promise<IOccupationEntity> {
		return this.repository.updateOccupationDetail(nutritionistId, {
			name,
			workPlace,
			experience,
		});
	}
}
