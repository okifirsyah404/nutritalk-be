import {
	AddressValidationMessage,
	DateOfBirthValidationMessage,
	NameValidationMessage,
	PhoneNumberValidationMessage,
	PlaceOfBirthValidationMessage,
} from "@constant/message";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateProfileRequest {
	@ApiProperty({
		example: "John Doe",
	})
	@IsString({
		message: NameValidationMessage.NAME_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: NameValidationMessage.NAME_REQUIRED,
	})
	readonly name: string;

	@ApiProperty({
		example: "081234567890",
	})
	@IsPhoneNumber("ID", {
		message: PhoneNumberValidationMessage.PHONE_NUMBER_INVALID,
	})
	@IsString({
		message: PhoneNumberValidationMessage.PHONE_NUMBER_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: PhoneNumberValidationMessage.PHONE_NUMBER_REQUIRED,
	})
	readonly phoneNumber: string;

	@ApiProperty({
		example: "Jl. Mastrip",
	})
	@IsString({
		message: AddressValidationMessage.ADDRESS_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: AddressValidationMessage.ADDRESS_REQUIRED,
	})
	readonly address: string;

	@ApiProperty({
		example: "Jember",
	})
	@IsString({
		message: PlaceOfBirthValidationMessage.PLACE_OF_BIRTH_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: PlaceOfBirthValidationMessage.PLACE_OF_BIRTH_REQUIRED,
	})
	readonly placeOfBirth: string;

	@ApiProperty({
		example: new Date(),
	})
	@Type(() => Date)
	@IsDate({
		message: DateOfBirthValidationMessage.DATE_OF_BIRTH_MUST_BE_DATE,
	})
	@IsNotEmpty({
		message: DateOfBirthValidationMessage.DATE_OF_BIRTH_REQUIRED,
	})
	readonly dateOfBirth: Date;
}
