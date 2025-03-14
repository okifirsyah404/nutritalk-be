import { dateTimeTransformer } from "@common";
import { IsWithinHourRange } from "@common/validator/is-within-hour-range.validator";
import { NutritionistValidationMessage } from "@constant/message";
import { IScheduleTimeEntity } from "@contract";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class NutritionistCreateScheduleTimeRequest
	implements Pick<IScheduleTimeEntity, "start" | "end">
{
	@Transform(dateTimeTransformer)
	@IsWithinHourRange({
		message:
			NutritionistValidationMessage.ERR_START_TIME_MUST_BETWEEN_7_AM_7_PM_WIB,
	})
	@IsDate({
		message: NutritionistValidationMessage.ERR_START_MUST_BE_DATE,
	})
	@IsNotEmpty({
		message: NutritionistValidationMessage.ERR_START_REQUIRED,
	})
	start: Date;

	@Transform(dateTimeTransformer)
	@IsWithinHourRange({
		message:
			NutritionistValidationMessage.ERR_END_TIME_MUST_BETWEEN_7_AM_7_PM_WIB,
	})
	@IsDate({
		message: NutritionistValidationMessage.ERR_END_MUST_BE_DATE,
	})
	@IsNotEmpty({
		message: NutritionistValidationMessage.ERR_END_REQUIRED,
	})
	end: Date;
}
