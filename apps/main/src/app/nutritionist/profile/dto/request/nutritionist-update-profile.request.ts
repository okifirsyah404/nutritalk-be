import { nullToUndefined } from "@common";
import { IsNotEmptyString } from "@common/validator/is-not-empty-string.validator";
import { ProfileValidationMessage } from "@constant/message";
import { IProfileEntity } from "@contract";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class NutritionistUpdateProfileRequest
	implements
		Partial<
			Pick<
				IProfileEntity,
				"name" | "phoneNumber" | "address" | "placeOfBirth" | "dateOfBirth"
			>
		>
{
	@ApiProperty({
		example: "John Doe",
	})
	@Transform(nullToUndefined)
	@IsNotEmptyString({
		message: ProfileValidationMessage.ERR_NAME_REQUIRED,
	})
	@IsString({
		message: ProfileValidationMessage.ERR_NAME_MUST_BE_STRING,
	})
	@IsOptional()
	readonly name?: string;

	@ApiProperty({
		example: "081234567890",
	})
	@Transform(nullToUndefined)
	@IsPhoneNumber("ID", {
		message: ProfileValidationMessage.ERR_PHONE_NUMBER_INVALID,
	})
	@IsNotEmptyString({
		message: ProfileValidationMessage.ERR_PHONE_NUMBER_REQUIRED,
	})
	@IsString({
		message: ProfileValidationMessage.ERR_PHONE_NUMBER_MUST_BE_STRING,
	})
	@IsOptional()
	readonly phoneNumber?: string;

	@ApiProperty({
		example: "Jl. Mastrip",
	})
	@Transform(nullToUndefined)
	@IsString({
		message: ProfileValidationMessage.ERR_ADDRESS_MUST_BE_STRING,
	})
	@IsOptional()
	readonly address?: string;

	@ApiProperty({
		example: "Jember",
	})
	@Transform(nullToUndefined)
	@IsString({
		message: ProfileValidationMessage.ERR_PLACE_OF_BIRTH_MUST_BE_STRING,
	})
	@IsOptional()
	readonly placeOfBirth?: string;

	@ApiProperty({
		example: new Date(),
	})
	@Transform(({ value }) => (value ? new Date(value) : undefined))
	@IsDate({
		message: ProfileValidationMessage.ERR_DATE_OF_BIRTH_MUST_BE_DATE,
	})
	@IsOptional()
	readonly dateOfBirth?: Date;

	@ApiProperty({
		example: "Lorem Ipsum",
	})
	@Transform(nullToUndefined)
	@IsString({
		message: ProfileValidationMessage.ERR_BIO_MUST_BE_STRING,
	})
	@IsOptional()
	readonly bio?: string;
}
