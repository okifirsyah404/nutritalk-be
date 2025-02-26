import { PatientForgetPasswordRequest } from "@app/app/patient/auth/dto/request/patient-forget-password.request";
import { IRegisterRequest } from "@contract";
import { Gender } from "@prisma/client";
import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MaxLength,
} from "class-validator";
import {
	AddressValidationMessage,
	BioValidationMessage,
	DateOfBirthValidationMessage,
	NameValidationMessage,
	PhoneNumberValidationMessage,
	PlaceOfBirthValidationMessage,
} from "@constant/message";
import { Type } from "class-transformer";
import { PickType } from "@nestjs/swagger";

export class PatientAuthRegisterRequest
	extends PickType(PatientForgetPasswordRequest, ["email", "signature"])
	implements IRegisterRequest
{
	@IsString({
		message: NameValidationMessage.ERR_NAME_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: NameValidationMessage.ERR_NAME_REQUIRED,
	})
	readonly name: string;

	@IsPhoneNumber("ID", {
		message: PhoneNumberValidationMessage.ERR_PHONE_NUMBER_INVALID,
	})
	@IsString({
		message: PhoneNumberValidationMessage.ERR_PHONE_NUMBER_MUST_BE_STRING,
	})
	@IsNotEmpty()
	readonly phoneNumber: string;

	@IsEnum(Gender)
	@IsNotEmpty()
	readonly gender: Gender;

	@IsString({
		message: PlaceOfBirthValidationMessage.ERR_PLACE_OF_BIRTH_MUST_BE_STRING,
	})
	@IsOptional()
	readonly placeOfBirth?: string;

	@Type(() => Date)
	@IsDate({
		message: DateOfBirthValidationMessage.ERR_DATE_OF_BIRTH_MUST_BE_DATE,
	})
	@IsOptional()
	readonly dateOfBirth?: Date;

	@IsString({
		message: AddressValidationMessage.ERR_ADDRESS_MUST_BE_STRING,
	})
	@IsOptional()
	readonly address?: string;

	@MaxLength(300, {
		message: BioValidationMessage.ERR_BIO_MAX_300,
	})
	@IsString({
		message: BioValidationMessage.ERR_BIO_MUST_BE_STRING,
	})
	@IsOptional()
	readonly bio?: string;
}
