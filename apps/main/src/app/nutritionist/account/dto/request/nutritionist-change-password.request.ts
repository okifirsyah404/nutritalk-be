import {
	ConfirmPasswordValidationMessage,
	PasswordValidationMessage,
	SignatureValidationMessage,
} from "@constant/message";
import { IsStrongPasswordConstant } from "@constant/option";
import { IChangePasswordRequest } from "@contract";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class NutritionistChangePasswordRequest
	implements IChangePasswordRequest
{
	/**
	 *
	 * Password api property.
	 *
	 * Decorators:
	 * - IsString
	 * - IsNotEmpty
	 * - IsStrongPassword
	 *
	 */
	@ApiProperty({
		example: "Secret Password",
	})
	@IsStrongPassword(IsStrongPasswordConstant.STRONG_PASSWORD, {
		message: PasswordValidationMessage.ERR_PASSWORD_PATTERN,
	})
	@IsString({
		message: PasswordValidationMessage.ERR_PASSWORD_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: PasswordValidationMessage.ERR_PASSWORD_REQUIRED,
	})
	password: string;

	/**
	 *
	 * Confirm password api property.
	 *
	 * Decorators:
	 * - IsString
	 * - IsNotEmpty
	 * - IsStrongPassword
	 *
	 */
	@ApiProperty({
		example: "Secret Password",
	})
	@IsStrongPassword(IsStrongPasswordConstant.STRONG_PASSWORD, {
		message: ConfirmPasswordValidationMessage.ERR_CONFIRM_PASSWORD_PATTERN,
	})
	@IsString({
		message:
			ConfirmPasswordValidationMessage.ERR_CONFIRM_PASSWORD_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: ConfirmPasswordValidationMessage.ERR_CONFIRM_PASSWORD_REQUIRED,
	})
	confirmPassword: string;

	/**
	 *
	 * Signature api property.
	 *
	 * Decorators:
	 * - IsString
	 * - IsNotEmpty
	 *
	 */
	@ApiProperty({
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
	})
	@IsString({
		message: SignatureValidationMessage.ERR_SIGNATURE_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: SignatureValidationMessage.ERR_SIGNATURE_REQUIRED,
	})
	signature: string;
}
