import {
	ConfirmPasswordValidationMessage,
	PasswordValidationMessage,
	SignatureValidationMessage,
} from "@constant/message";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class AuthForgetPasswordRequest {
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
	@IsString({
		message: PasswordValidationMessage.ERR_PASSWORD_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: PasswordValidationMessage.ERR_PASSWORD_REQUIRED,
	})
	@IsStrongPassword(
		{
			minLength: 12,
			minNumbers: 4,
			minUppercase: 1,
		},
		{
			message: PasswordValidationMessage.ERR_PASSWORD_PATTERN,
		},
	)
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
	@IsString({
		message:
			ConfirmPasswordValidationMessage.ERR_CONFIRM_PASSWORD_MUST_BE_STRING,
	})
	@IsNotEmpty({
		message: ConfirmPasswordValidationMessage.ERR_CONFIRM_PASSWORD_REQUIRED,
	})
	@IsStrongPassword(
		{
			minLength: 12,
			minNumbers: 4,
			minUppercase: 1,
		},
		{
			message: ConfirmPasswordValidationMessage.ERR_CONFIRM_PASSWORD_PATTERN,
		},
	)
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
