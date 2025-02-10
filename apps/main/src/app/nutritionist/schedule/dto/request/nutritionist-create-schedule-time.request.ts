import { ScheduleValidationMessage } from "@constant/message";
import { IScheduleTimeEntity } from "@contract";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class NutritionistCreateScheduleTimeRequest
	implements Pick<IScheduleTimeEntity, "start" | "end">
{
	@Type(() => Date)
	@IsDate({
		message: ScheduleValidationMessage.ERR_START_MUST_BE_DATE,
	})
	@IsNotEmpty({
		message: ScheduleValidationMessage.ERR_START_REQUIRED,
	})
	start: Date;

	@Type(() => Date)
	@IsDate({
		message: ScheduleValidationMessage.ERR_END_MUST_BE_DATE,
	})
	@IsNotEmpty({
		message: ScheduleValidationMessage.ERR_END_REQUIRED,
	})
	end: Date;
}
