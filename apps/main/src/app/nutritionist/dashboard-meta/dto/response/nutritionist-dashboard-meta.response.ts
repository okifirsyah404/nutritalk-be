import { INutritionistDashboardMeta } from "@contract";

export class NutritionistDashboardMetaResponse
	implements INutritionistDashboardMeta
{
	private constructor(entity: INutritionistDashboardMeta) {
		this.waitingConfirmationConsultation =
			entity.waitingConfirmationConsultation;
		this.scheduledConsultation = entity.scheduledConsultation;
		this.reScheduledConsultation = entity.reScheduledConsultation;
		this.finishedConsultation = entity.finishedConsultation;
		this.cancelledConsultation = entity.cancelledConsultation;
		this.totalConsultation = entity.totalConsultation;
	}

	waitingConfirmationConsultation: number;
	scheduledConsultation: number;
	reScheduledConsultation: number;
	finishedConsultation: number;
	cancelledConsultation: number;
	totalConsultation: number;

	static fromEntity(
		entity: INutritionistDashboardMeta,
	): NutritionistDashboardMetaResponse {
		return new NutritionistDashboardMetaResponse(entity);
	}
}
