import { NutritionistErrorMessage } from "@constant/message";
import { INutritionistSystemSettingEntity } from "@contract";
import { Injectable, NotFoundException } from "@nestjs/common";
import { NutritionistSettingRepository } from "../repository/nutritionist-setting.repository";

@Injectable()
export class NutritionistSettingService {
	constructor(private readonly repository: NutritionistSettingRepository) {}

	async getNutritionistSetting(
		nutritionistId: string,
	): Promise<INutritionistSystemSettingEntity> {
		const result =
			await this.repository.findNutritionistSetting(nutritionistId);

		if (!result) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_NUTRITIONIST_SYSTEM_SETTING_NOT_FOUND,
			);
		}

		return result;
	}

	async updateNutritionistSetting(
		nutritionistId: string,
		data: Partial<INutritionistSystemSettingEntity>,
	): Promise<INutritionistSystemSettingEntity> {
		const result = await this.repository.updateNutritionistSetting(
			nutritionistId,
			data,
		);

		if (!result) {
			throw new NotFoundException(
				NutritionistErrorMessage.ERR_NUTRITIONIST_SYSTEM_SETTING_NOT_FOUND,
			);
		}

		return result;
	}
}
