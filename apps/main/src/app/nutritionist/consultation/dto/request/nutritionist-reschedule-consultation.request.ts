import { dateTransformer } from "@common";
import { IsWithinHourRange } from "@common/validator/is-within-hour-range.validator";
import {
	ConsultationValidationMessage,
	NutritionistValidationMessage,
} from "@constant/message";
import { ICreateConsultationOrderRequest } from "@contract";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class NutritionistRescheduleConsultationRequest
	implements Pick<ICreateConsultationOrderRequest, "start" | "duration">
{
	@Transform(dateTransformer)
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

	@IsNumber(
		{},
		{ message: ConsultationValidationMessage.ERR_DURATION_MUST_BE_NUMBER },
	)
	@IsNotEmpty({
		message: ConsultationValidationMessage.ERR_DURATION_REQUIRED,
	})
	duration: number;
}
