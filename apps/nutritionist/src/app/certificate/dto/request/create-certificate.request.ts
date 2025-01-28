import { RegistrationCertificateValidationMessage } from "@constant/message";
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

export class CreateCertificateRequest
	implements
		Pick<
			IRegistrationCertificateEntity,
			"registrationNumber" | "issueDate" | "validUntil"
		>
{
	@Matches(RegexConstant.REGISTRATION_CERTIFICATE, {
		message:
			RegistrationCertificateValidationMessage.REGISTRATION_NUMBER_INVALID,
	})
	@IsString({
		message:
			RegistrationCertificateValidationMessage.REGISTRATION_NUMBER_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message:
			RegistrationCertificateValidationMessage.REGISTRATION_NUMBER_REQUIRED,
	})
	registrationNumber: string;

	@Type(() => Date)
	@IsDate({
		message: RegistrationCertificateValidationMessage.ISSUE_DATE_MUST_BE_DATE,
	})
	@IsOptional({})
	issueDate: Date;

	@Type(() => Date)
	@IsDate({
		message: RegistrationCertificateValidationMessage.VALID_UNTIL_MUST_BE_DATE,
	})
	@IsOptional()
	validUntil: Date;
}
