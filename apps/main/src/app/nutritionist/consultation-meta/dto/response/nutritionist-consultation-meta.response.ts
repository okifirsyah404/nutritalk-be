import { IConsultationMetaEntity } from "@contract";

export class NutritionistConsultationMetaResponse
	implements IConsultationMetaEntity
{
	private constructor(
		nutritionistId: string,
		avgRating: number,
		consultation: number,
		successConsultation: number,
	) {
		this.id = nutritionistId;
		this.avgRating = avgRating;
		this.consultation = consultation;
		this.successConsultation = successConsultation;
	}

	readonly id: string;
	readonly avgRating: number;
	readonly consultation: number;
	readonly successConsultation: number;

	static fromEntity(
		entity: IConsultationMetaEntity,
	): NutritionistConsultationMetaResponse {
		return new NutritionistConsultationMetaResponse(
			entity.id,
			entity.avgRating,
			entity.consultation,
			entity.successConsultation,
		);
	}
}
