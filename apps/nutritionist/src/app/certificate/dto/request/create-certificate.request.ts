import { RegistrationCertificateValidationMessage } from "@constant/message";
import { RegexConstant } from "@constant/regex";
import { Type } from "class-transformer";
import {
	IsDate,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
} from "class-validator";

export class CreateCertificateRequest {
	@Matches(RegexConstant.REGISTRATION_CERTIFICATE, {
		message:
			RegistrationCertificateValidationMessage.REGISTRATION_NUMBER_MUST_BE_VALID,
	})
	@IsString({
		message:
			RegistrationCertificateValidationMessage.REGISTRATION_NUMBER_MUST_BE_A_STRING,
	})
	@IsNotEmpty({
		message:
			RegistrationCertificateValidationMessage.REGISTRATION_NUMBER_NOT_BE_EMPTY,
	})
	registrationNumber: string;

	@Type(() => Date)
	@IsDate({
		message: RegistrationCertificateValidationMessage.ISSUE_DATE_MUST_BE_A_DATE,
	})
	@IsOptional({})
	issueDate: Date;

	@Type(() => Date)
	@IsDate({
		message:
			RegistrationCertificateValidationMessage.VALID_UNTIL_MUST_BE_A_DATE,
	})
	@IsOptional()
	validUntil: Date;
}
