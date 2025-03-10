import { INutritionistSystemSettingEntity } from "@contract";

export class NutritionistSettingResponse
	implements INutritionistSystemSettingEntity
{
	private constructor(entity: INutritionistSystemSettingEntity) {
		this.id = entity.id;
		this.isAutoAvailable = entity.isAutoAvailable;
	}

	id: string;
	isAutoAvailable?: boolean;

	static fromEntity(
		entity: INutritionistSystemSettingEntity,
	): NutritionistSettingResponse {
		return new NutritionistSettingResponse(entity);
	}
}
