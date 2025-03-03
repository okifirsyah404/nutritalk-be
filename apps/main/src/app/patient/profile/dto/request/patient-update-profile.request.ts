import { IProfileEntity } from "@contract";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmptyString, nullToUndefined } from "@common";
import {
	AddressValidationMessage,
	BioValidationMessage,
	DateOfBirthValidationMessage,
	NameValidationMessage,
	PhoneNumberValidationMessage,
	PlaceOfBirthValidationMessage,
} from "@constant/message";
import {
	IsDate,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MaxLength,
} from "class-validator";

export class PatientUpdateProfileRequest
	implements
		Partial<
			Pick<
				IProfileEntity,
				| "name"
				| "phoneNumber"
				| "address"
				| "placeOfBirth"
				| "dateOfBirth"
				| "bio"
			>
		>
{
	@ApiProperty({
		example: "John Doe",
	})
	@Transform(nullToUndefined)
	@IsNotEmptyString({
		message: NameValidationMessage.ERR_NAME_REQUIRED,
	})
	@IsString({
		message: NameValidationMessage.ERR_NAME_MUST_BE_STRING,
	})
	@IsOptional()
	readonly name?: string;

	@ApiProperty({
		example: "081234567890",
	})
	@Transform(nullToUndefined)
	@IsPhoneNumber("ID", {
		message: PhoneNumberValidationMessage.ERR_PHONE_NUMBER_INVALID,
	})
	@IsNotEmptyString({
		message: PhoneNumberValidationMessage.ERR_PHONE_NUMBER_REQUIRED,
	})
	@IsString({
		message: PhoneNumberValidationMessage.ERR_PHONE_NUMBER_MUST_BE_STRING,
	})
	@IsOptional()
	readonly phoneNumber?: string;

	@ApiProperty({
		example: "Jl. Mastrip",
	})
	@Transform(nullToUndefined)
	@IsString({
		message: AddressValidationMessage.ERR_ADDRESS_MUST_BE_STRING,
	})
	@IsOptional()
	readonly address?: string;

	@ApiProperty({
		example: "Jember",
	})
	@Transform(nullToUndefined)
	@IsString({
		message: PlaceOfBirthValidationMessage.ERR_PLACE_OF_BIRTH_MUST_BE_STRING,
	})
	@IsOptional()
	readonly placeOfBirth?: string;

	@ApiProperty({
		example: new Date(),
	})
	@Transform(({ value }) => (value ? new Date(value) : undefined))
	@IsDate({
		message: DateOfBirthValidationMessage.ERR_DATE_OF_BIRTH_MUST_BE_DATE,
	})
	@IsOptional()
	readonly dateOfBirth?: Date;

	@ApiProperty({
		example: "Lorem Ipsum",
	})
	@Transform(nullToUndefined)
	@MaxLength(300, {
		message: BioValidationMessage.ERR_BIO_MAX_300,
	})
	@IsString({
		message: BioValidationMessage.ERR_BIO_MUST_BE_STRING,
	})
	@IsOptional()
	readonly bio?: string;
}
