import { nullToUndefined } from "@common";
import { RegistrationCertificateValidationMessage } from "@constant/message";
import { RegexConstant } from "@constant/regex";
import { PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, Matches } from "class-validator";
import { NutritionistCreateCertificateRequest } from "./nutritionist-create-certificate.request";

export class NutritionistUpdateCertificateRequest extends PartialType(
	NutritionistCreateCertificateRequest,
) {
	@Transform(nullToUndefined)
	@Matches(RegexConstant.REGISTRATION_CERTIFICATE, {
		message:
			RegistrationCertificateValidationMessage.REGISTRATION_NUMBER_INVALID,
	})
	@IsString({
		message:
			RegistrationCertificateValidationMessage.REGISTRATION_NUMBER_MUST_BE_STRING,
	})
	@IsOptional()
	registrationNumber?: string;
}
