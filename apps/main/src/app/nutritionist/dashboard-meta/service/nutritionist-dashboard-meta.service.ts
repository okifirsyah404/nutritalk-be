import { Injectable } from "@nestjs/common";
import { NutritionistDashboardMetaRepository } from "../repository/nutritionist-dashboard-meta.repository";
import { INutritionistDashboardMeta } from "@contract";
import { SetCache } from "@config/app-cache";

@Injectable()
export class NutritionistDashboardMetaService {
	constructor(
		private readonly repository: NutritionistDashboardMetaRepository,
	) {}

	@SetCache((nutritionistId: string) => `dashboard-meta:${nutritionistId}`, {
		ttl: 1,
		unit: "minutes",
	})
	async getNutritionistDashboardMeta(
		nutritionistId: string,
	): Promise<INutritionistDashboardMeta> {
		return this.repository.getNutritionistDashboardMeta(nutritionistId);
	}
}
