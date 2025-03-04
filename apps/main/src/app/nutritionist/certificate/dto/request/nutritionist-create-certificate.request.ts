import { NutritionistValidationMessage } from "@constant/message";
import { RegexConstant } from "@constant/regex";
import { IRegistrationCertificateEntity } from "@contract";
import { Type } from "class-transformer";
import {
	IsDate,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
} from "class-validator";

export class NutritionistCreateCertificateRequest
	implements
		Pick<
			IRegistrationCertificateEntity,
			"registrationNumber" | "issueDate" | "validUntil"
		>
{
	@Matches(RegexConstant.REGISTRATION_CERTIFICATE, {
		message: NutritionistValidationMessage.ERR_REGISTRATION_NUMBER_INVALID,
	})
	@IsString({
		message:
			NutritionistValidationMessage.ERR_REGISTRATION_NUMBER_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: NutritionistValidationMessage.ERR_REGISTRATION_NUMBER_REQUIRED,
	})
	registrationNumber: string;

	@Type(() => Date)
	@IsDate({
		message: NutritionistValidationMessage.ERR_ISSUE_DATE_MUST_BE_DATE,
	})
	@IsOptional()
	issueDate: Date;

	@Type(() => Date)
	@IsDate({
		message: NutritionistValidationMessage.ERR_VALID_UNTIL_MUST_BE_DATE,
	})
	@IsOptional()
	validUntil: Date;
}
