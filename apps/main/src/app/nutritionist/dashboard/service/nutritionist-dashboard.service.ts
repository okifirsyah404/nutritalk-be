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

		const ongoingConsultations = await Promise.all(
			consultations.ongoingConsultations.map(async (consultation) => ({
				...consultation,
				patient: {
					...consultation.patient,
					profile: await this.s3Service.getProfileSignedUrl(
						consultation.patient.profile,
					),
				},
			})),
		);

		const waitingConfirmConsultations = await Promise.all(
			consultations.waitingConfirmConsultations.map(async (consultation) => ({
				...consultation,
				patient: {
					...consultation.patient,
					profile: await this.s3Service.getProfileSignedUrl(
						consultation.patient.profile,
					),
				},
			})),
		);

		const scheduledConsultations = await Promise.all(
			consultations.scheduledConsultations.map(async (consultation) => ({
				...consultation,
				patient: {
					...consultation.patient,
					profile: await this.s3Service.getProfileSignedUrl(
						consultation.patient.profile,
					),
				},
			})),
		);

		const finishedConsultations = await Promise.all(
			consultations.finishedConsultations.map(async (consultation) => ({
				...consultation,
				patient: {
					...consultation.patient,
					profile: await this.s3Service.getProfileSignedUrl(
						consultation.patient.profile,
					),
				},
			})),
		);

		return {
			nutritionist: {
				...nutritionist,
				profile: await this.s3Service.getProfileSignedUrl(nutritionist.profile),
			},
			dashboardMeta,
			ongoingConsultations,
			scheduledConsultations,
			waitingConfirmConsultations,
			finishedConsultations,
		};
	}
}
