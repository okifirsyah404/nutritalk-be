import { Module } from "@nestjs/common";
import { NutritionistDashboardController } from "./controller/nutritionist-dashboard.controller";
import { NutritionistDashboardRepository } from "./repository/nutritionist-dashboard.repository";
import { NutritionistDashboardService } from "./service/nutritionist-dashboard.service";

@Module({
	controllers: [NutritionistDashboardController],
	providers: [NutritionistDashboardService, NutritionistDashboardRepository],
})
export class NutritionistDashboardModule {}
