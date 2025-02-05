import { SetCache } from "@config/app-cache";
import { S3StorageService } from "@config/s3storage";
import { IConsultationEntity, INutritionistEntity } from "@contract";
import { Injectable } from "@nestjs/common";
import { DashboardRepository } from "../repository/dashboard.repository";

@Injectable()
export class DashboardService {
	constructor(
		private readonly s3Service: S3StorageService,
		private readonly repository: DashboardRepository,
	) {}

	async getDashboardData(nutritionistId: string): Promise<{
		nutritionist: INutritionistEntity;
		countScheduledConsultation: number;
		scheduledConsultations: IConsultationEntity[];
		countPendingConsultation: number;
		pendingConsultations: IConsultationEntity[];
	}> {
		const [
			nutritionist,
			countScheduledConsultation,
			scheduledConsultations,
			countPendingConsultation,
			pendingConsultations,
		] = await Promise.all([
			this._getProfile(nutritionistId),
			this._getCountScheduledConsultations(nutritionistId),
			this._getScheduledConsultations(nutritionistId),
			this._getCountPendingConsultations(nutritionistId),
			this._getPendingConsultations(nutritionistId),
		]);

		return {
			nutritionist,
			countScheduledConsultation,
			scheduledConsultations,
			countPendingConsultation,
			pendingConsultations,
		};
	}

	@SetCache<INutritionistEntity>((id: string) => `profile:${id}`)
	private async _getProfile(id: string): Promise<INutritionistEntity> {
		const result = await this.repository.getProfile(id);

		result.profile.imageKey = await this.s3Service.getSignedUrl(
			result.profile.imageKey,
		);

		return result;
	}

	@SetCache<number>((id: string) => `countScheduledConsultation:${id}`)
	private async _getCountScheduledConsultations(id: string): Promise<number> {
		return this.repository.countNearbyScheduledConsultations(id);
	}

	@SetCache<IConsultationEntity[]>(
		(id: string) => `scheduledConsultations:${id}`,
	)
	private async _getScheduledConsultations(
		id: string,
	): Promise<IConsultationEntity[]> {
		return this.repository.getNearbyScheduledConsultations(id);
	}

	@SetCache<number>((id: string) => `countPendingConsultation:${id}`)
	private async _getCountPendingConsultations(id: string): Promise<number> {
		return this.repository.countPendingConsultations(id);
	}

	@SetCache<IConsultationEntity[]>((id: string) => `pendingConsultations:${id}`)
	private async _getPendingConsultations(
		id: string,
	): Promise<IConsultationEntity[]> {
		return this.repository.getPendingConsultations(id);
	}
}
