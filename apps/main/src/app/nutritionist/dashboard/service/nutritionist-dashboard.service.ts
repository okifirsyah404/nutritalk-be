import { SetCache } from "@config/app-cache";
import { AppS3StorageService } from "@config/s3storage";
import { INutritionistDashboardResponse } from "@contract";
import { Injectable } from "@nestjs/common";
import { NutritionistDashboardRepository } from "../repository/nutritionist-dashboard.repository";

@Injectable()
export class NutritionistDashboardService {
	constructor(
		private readonly repository: NutritionistDashboardRepository,
		private readonly s3Service: AppS3StorageService,
	) {}

	/**
	 * Retrieves the nutritionist dashboard data for a given nutritionist ID.
	 *
	 * @param nutritionistId - The unique identifier of the nutritionist.
	 * @returns A promise that resolves to the nutritionist dashboard response object.
	 */
	@SetCache((patientId: string) => `nutritionist-dashboard-${patientId}`, {
		ttl: 1,
		unit: "minute",
	})
	async getNutritionistDashboard(
		nutritionistId: string,
	): Promise<INutritionistDashboardResponse> {
		const nutritionist = await this.repository.findProfileById(nutritionistId);
		const dashboardMeta =
			await this.repository.countConsultations(nutritionistId);
		const consultations =
			await this.repository.findConsultations(nutritionistId);

		return {
			nutritionist: {
				...nutritionist,
				profile: await this.s3Service.getProfileSignedUrl(nutritionist.profile),
			},
			dashboardMeta,
			ongoingConsultations: consultations.ongoingConsultations,
			scheduledConsultations: consultations.scheduledConsultations,
			waitingConfirmConsultations: consultations.waitingConfirmConsultations,
			finishedConsultations: consultations.finishedConsultations,
		};
	}
}
