import { Module } from "@nestjs/common";
import { NutritionistDashboardMetaService } from "./service/nutritionist-dashboard-meta.service";
import { NutritionistDashboardMetaController } from "./controller/nutritionist-dashboard-meta.controller";
import { NutritionistDashboardMetaRepository } from "@app/app/nutritionist/dashboard-meta/repository/nutritionist-dashboard-meta.repository";

@Module({
	controllers: [NutritionistDashboardMetaController],
	providers: [
		NutritionistDashboardMetaService,
		NutritionistDashboardMetaRepository,
	],
})
export class NutritionistDashboardMetaModule {}
