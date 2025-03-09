import { dateTimeTransformer } from "@common";
import { DateContent } from "@constant/content";
import { NutritionistValidationMessage } from "@constant/message";
import { IScheduleTimeEntity } from "@contract";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, MaxDate, MinDate } from "class-validator";

export class NutritionistCreateScheduleTimeRequest
	implements Pick<IScheduleTimeEntity, "start" | "end">
{
	@Transform(dateTimeTransformer)
	@MinDate(DateContent.MIN_SCHEDULE_TIME, {
		message: NutritionistValidationMessage.ERR_MIN_END_TIME_7_AM_WIB,
	})
	@MaxDate(DateContent.MAX_SCHEDULE_TIME, {
		message: NutritionistValidationMessage.ERR_MAX_END_TIME_7_PM_WIB,
	})
	@IsDate({
		message: NutritionistValidationMessage.ERR_START_MUST_BE_DATE,
	})
	@IsNotEmpty({
		message: NutritionistValidationMessage.ERR_START_REQUIRED,
	})
	start: Date;

	@Transform(dateTimeTransformer)
	@MinDate(DateContent.MIN_SCHEDULE_TIME, {
		message: NutritionistValidationMessage.ERR_MIN_END_TIME_7_AM_WIB,
	})
	@MaxDate(DateContent.MAX_SCHEDULE_TIME, {
		message: NutritionistValidationMessage.ERR_MAX_END_TIME_7_PM_WIB,
	})
	@IsDate({
		message: NutritionistValidationMessage.ERR_END_MUST_BE_DATE,
	})
	@IsNotEmpty({
		message: NutritionistValidationMessage.ERR_END_REQUIRED,
	})
	end: Date;
}
