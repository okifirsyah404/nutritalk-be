import { nullToUndefined } from "@common";
import { NutritionistValidationMessage } from "@constant/message";
import { INutritionistSystemSettingEntity } from "@contract";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class NutritionistUpdateSettingRequest
	implements Partial<INutritionistSystemSettingEntity>
{
	@Transform(nullToUndefined)
	@IsBoolean({
		message:
			NutritionistValidationMessage.ERR_IS_AUTO_AVAILABLE_MUST_BE_BOOLEAN,
	})
	@IsOptional()
	isAutoAvailable?: boolean;
}
