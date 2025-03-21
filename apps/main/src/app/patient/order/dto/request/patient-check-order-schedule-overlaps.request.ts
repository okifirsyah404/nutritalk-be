import {
	consultationTypeEnumStringTransformer,
	dateTransformer,
} from "@common";
import { IsWithinHourRange } from "@common/validator/is-within-hour-range.validator";
import {
	ConsultationValidationMessage,
	NutritionistValidationMessage,
} from "@constant/message";
import { ICheckOrderScheduleOverlaps } from "@contract";
import { ConsultationType } from "@prisma/client";
import { Transform } from "class-transformer";
import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

export class PatientCheckOrderScheduleOverlapsRequest
	implements ICheckOrderScheduleOverlaps
{
	@IsString({
		message: NutritionistValidationMessage.ERR_NUTRITIONIST_ID_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: NutritionistValidationMessage.ERR_NUTRITIONIST_ID_REQUIRED,
	})
	nutritionistId: string;

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

	@Transform(dateTransformer)
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

	@Transform(consultationTypeEnumStringTransformer)
	@IsEnum(ConsultationType, {
		message: ConsultationValidationMessage.ERR_CONSULTATION_TYPE_MUST_BE_ENUM,
	})
	@IsOptional()
	type?: ConsultationType;
}
