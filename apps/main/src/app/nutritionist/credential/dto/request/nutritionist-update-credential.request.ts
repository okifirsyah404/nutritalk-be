import { NidnValidationMessage, NipValidationMessage } from "@constant/message";
import { INutritionistEntity } from "@contract";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class NutritionistUpdateCredentialRequest
	implements Partial<Pick<INutritionistEntity, "nip" | "nidn">>
{
	@Transform(({ value }): string | undefined =>
		value === "" ? undefined : value,
	)
	@IsString({
		message: NipValidationMessage.NIP_MUST_BE_STRING,
	})
	@IsOptional()
	nip?: string;

	@Transform(({ value }): string | undefined =>
		value === "" ? undefined : value,
	)
	@IsString({
		message: NidnValidationMessage.NIDN_MUST_BE_STRING,
	})
	@IsOptional()
	nidn?: string;
}
