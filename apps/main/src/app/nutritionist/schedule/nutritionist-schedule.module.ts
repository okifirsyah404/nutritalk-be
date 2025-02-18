import { Module } from "@nestjs/common";
import { NutritionistScheduleController } from "./controller/nutritionist-schedule.controller";
import { NutritionistScheduleRepository } from "./repository/nutritionist-schedule.repository";
import { NutritionistScheduleService } from "./service/nutritionist-schedule.service";

@Module({
	controllers: [NutritionistScheduleController],
	providers: [NutritionistScheduleService, NutritionistScheduleRepository],
})
export class NutritionistScheduleModule {}
