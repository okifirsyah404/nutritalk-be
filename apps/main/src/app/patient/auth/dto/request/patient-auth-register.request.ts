import { PatientForgetPasswordRequest } from "@app/app/patient/auth/dto/request/patient-forget-password.request";
import { IsIndonesianPhoneNumber } from "@common";
import { ProfileValidationMessage } from "@constant/message";
import { IRegisterRequest } from "@contract";
import { PickType } from "@nestjs/swagger";
import { Gender } from "@prisma/client";
import { Type } from "class-transformer";
import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

export class PatientAuthRegisterRequest
	extends PickType(PatientForgetPasswordRequest, ["email", "signature"])
	implements IRegisterRequest
{
	@IsString({
		message: ProfileValidationMessage.ERR_NAME_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: ProfileValidationMessage.ERR_NAME_REQUIRED,
	})
	readonly name: string;

	// @IsPhoneNumber("ID", {
	// 	message: PhoneNumberValidationMessage.ERR_PHONE_NUMBER_INVALID,
	// })
	@IsIndonesianPhoneNumber({
		message: ProfileValidationMessage.ERR_PHONE_NUMBER_INVALID,
	})
	@IsString({
		message: ProfileValidationMessage.ERR_PHONE_NUMBER_MUST_BE_STRING,
	})
	@IsNotEmpty()
	readonly phoneNumber: string;

	@IsEnum(Gender)
	@IsNotEmpty()
	readonly gender: Gender;

	@IsString({
		message: ProfileValidationMessage.ERR_PLACE_OF_BIRTH_MUST_BE_STRING,
	})
	@IsOptional()
	readonly placeOfBirth?: string;

	@Type(() => Date)
	@IsDate({
		message: ProfileValidationMessage.ERR_DATE_OF_BIRTH_MUST_BE_DATE,
	})
	@IsOptional()
	readonly dateOfBirth?: Date;

	@IsString({
		message: ProfileValidationMessage.ERR_ADDRESS_MUST_BE_STRING,
	})
	@IsOptional()
	readonly address?: string;

	@IsString({
		message: ProfileValidationMessage.ERR_BIO_MUST_BE_STRING,
	})
	@IsOptional()
	readonly bio?: string;
}
