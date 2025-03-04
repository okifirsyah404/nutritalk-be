import { nullToUndefined } from "@common";
import {
	NutritionistValidationMessage,
	ProfileValidationMessage,
} from "@constant/message";
import { IOccupationEntity } from "@contract";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class NutritionistUpdateOccupationRequest
	implements
		Partial<Pick<IOccupationEntity, "name" | "workPlace" | "experience">>
{
	@Transform(nullToUndefined)
	@IsString({
		message: ProfileValidationMessage.ERR_NAME_MUST_BE_STRING,
	})
	@IsOptional()
	readonly name?: string;

	@Transform(nullToUndefined)
	@IsString({
		message: NutritionistValidationMessage.ERR_WORK_PLACE_MUST_BE_STRING,
	})
	@IsOptional()
	readonly workPlace?: string;

	@Transform(nullToUndefined)
	@IsInt({
		message: NutritionistValidationMessage.ERR_EXPERIENCE_MUST_BE_INT,
	})
	@IsOptional()
	readonly experience?: number;
}
