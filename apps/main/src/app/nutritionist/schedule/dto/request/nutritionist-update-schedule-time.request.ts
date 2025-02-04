import { PartialType } from "@nestjs/swagger";
import { NutritionistCreateScheduleTimeRequest } from "./nutritionist-create-schedule-time.request";

export class NutritionistUpdateScheduleTimeRequest extends PartialType(
	NutritionistCreateScheduleTimeRequest,
) {}
