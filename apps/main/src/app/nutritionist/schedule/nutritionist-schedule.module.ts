import { Module } from "@nestjs/common";
import { NutritionistScheduleService } from "./nutritionist-schedule.service";
import { NutritionistScheduleController } from "./nutritionist-schedule.controller";

@Module({
	controllers: [NutritionistScheduleController],
	providers: [NutritionistScheduleService],
})
export class NutritionistScheduleModule {}
