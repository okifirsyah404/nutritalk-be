import { Controller } from "@nestjs/common";
import { NutritionistScheduleService } from "./nutritionist-schedule.service";

@Controller("nutritionist-schedule")
export class NutritionistScheduleController {
	constructor(
		private readonly nutritionistScheduleService: NutritionistScheduleService,
	) {}
}
