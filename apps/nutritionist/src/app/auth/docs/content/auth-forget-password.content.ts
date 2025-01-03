import { AuthErrorMessage } from "@common/constant/message/error/auth-error.message";
import { JwtTokenError } from "@common/constant/message/error/jwt-token-error.message";
import { EmailValidationMessage } from "@common/constant/message/validation/email-validation.message";
import { OtpValidationMessage } from "@common/constant/message/validation/otp-validation.message";
import { PasswordValidationMessage } from "@common/constant/message/validation/password-validation.message";
import { SignatureValidationMessage } from "@common/constant/message/validation/signature-validation.message";
import { BaseApiResponse } from "@common/response/base-api.response";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { AuthForgetPasswordSuccessMessage } from "apps/nutritionist/src/common/constant/message/success/auth-forget-password-success.message";
import { AuthForgetPasswordResponse } from "../../dto/response/auth-forget-password.response";
import { AuthOtpVerifyForgetPasswordResponse } from "../../dto/response/auth-otp-forget-password.response";

export abstract class AuthForgetPasswordContent {
	static readonly AUTH_REQUEST_OTP_FORGET_PASSWORD_SUCCESS: ContentObject = {
		"application/json": {
			example: {
				message: BaseApiResponse.created({
					message: AuthForgetPasswordSuccessMessage.SUCCESS_SEND_OTP_TO_EMAIL,
					data: AuthForgetPasswordResponse.exampleData,
				}),
			},
		},
	};

	static readonly AUTH_REQUEST_OTP_FORGET_PASSWORD_BAD_REQUEST: ContentObject =
		{
			"application/json": {
				examples: {
					"Email Required": {
						value: BaseApiResponse.badRequest({
							message: EmailValidationMessage.ERR_EMAIL_REQUIRED,
						}),
					},
					"Email Must Be String": {
						value: BaseApiResponse.badRequest({
							message: EmailValidationMessage.ERR_EMAIL_MUST_BE_STRING,
						}),
					},
					"Email Invalid": {
						value: BaseApiResponse.badRequest({
							message: EmailValidationMessage.ERR_EMAIL_INVALID,
						}),
					},
				},
			},
		};

	static readonly AUTH_VERIFY_OTP_FORGET_PASSWORD_SUCCESS: ContentObject = {
		"application/json": {
			example: {
				message: BaseApiResponse.created({
					message: AuthForgetPasswordSuccessMessage.SUCCESS_VERIFY_OTP,
					data: AuthOtpVerifyForgetPasswordResponse.exampleData,
				}),
			},
		},
	};

	static readonly AUTH_VERIFY_OTP_FORGET_PASSWORD_BAD_REQUEST: ContentObject = {
		"application/json": {
			examples: {
				"Email Required": {
					value: BaseApiResponse.badRequest({
						message: EmailValidationMessage.ERR_EMAIL_REQUIRED,
					}),
				},
				"Email Must Be String": {
					value: BaseApiResponse.badRequest({
						message: EmailValidationMessage.ERR_EMAIL_MUST_BE_STRING,
					}),
				},
				"Email Invalid": {
					value: BaseApiResponse.badRequest({
						message: EmailValidationMessage.ERR_EMAIL_INVALID,
					}),
				},
				"OTP Required": {
					value: BaseApiResponse.badRequest({
						message: OtpValidationMessage.ERR_OTP_REQUIRED,
					}),
				},
				"OTP Must Be String": {
					value: BaseApiResponse.badRequest({
						message: OtpValidationMessage.ERR_OTP_MUST_BE_STRING,
					}),
				},
				"OTP Invalid": {
					value: BaseApiResponse.badRequest({
						message: AuthErrorMessage.ERR_OTP_INVALID,
					}),
				},
			},
		},
	};

	static readonly AUTH_RESET_PASSWORD_SUCCESS: ContentObject = {
		"application/json": {
			example: {
				message: BaseApiResponse.created({
					message: AuthForgetPasswordSuccessMessage.SUCCESS_RESET_PASSWORD,
					data: AuthForgetPasswordResponse.exampleData,
				}),
			},
		},
	};

	static readonly AUTH_RESET_PASSWORD_BAD_REQUEST: ContentObject = {
		"application/json": {
			examples: {
				"Password Required": {
					value: BaseApiResponse.badRequest({
						message: PasswordValidationMessage.ERR_PASSWORD_REQUIRED,
					}),
				},
				"Password Must Be String": {
					value: BaseApiResponse.badRequest({
						message: PasswordValidationMessage.ERR_PASSWORD_MUST_BE_STRING,
					}),
				},
				"Password Must Be Strong": {
					value: BaseApiResponse.badRequest({
						message: PasswordValidationMessage.ERR_PASSWORD_PATTERN,
					}),
				},
				"Confirm Password Required": {
					value: BaseApiResponse.badRequest({
						message: PasswordValidationMessage.ERR_PASSWORD_REQUIRED,
					}),
				},
				"Confirm Password Must Be String": {
					value: BaseApiResponse.badRequest({
						message: PasswordValidationMessage.ERR_PASSWORD_MUST_BE_STRING,
					}),
				},
				"Confirm Password Must Be Strong": {
					value: BaseApiResponse.badRequest({
						message: PasswordValidationMessage.ERR_PASSWORD_PATTERN,
					}),
				},
				"Confirm Password Not Match": {
					value: BaseApiResponse.badRequest({
						message: AuthErrorMessage.ERR_PASSWORD_NOT_MATCH,
					}),
				},
				"Signature Required": {
					value: BaseApiResponse.badRequest({
						message: SignatureValidationMessage.ERR_SIGNATURE_REQUIRED,
					}),
				},
				"Signature Must Be String": {
					value: BaseApiResponse.badRequest({
						message: SignatureValidationMessage.ERR_SIGNATURE_MUST_BE_STRING,
					}),
				},
			},
		},
	};

	static readonly AUTH_RESET_PASSWORD_UNAUTHORIZED: ContentObject = {
		"application/json": {
			examples: {
				"Expired Signature": {
					value: BaseApiResponse.unauthorized({
						message: JwtTokenError.ERR_SIGNATURE_TOKEN_EXPIRED,
					}),
				},
				"Invalid Signature": {
					value: BaseApiResponse.unauthorized({
						message: JwtTokenError.ERR_SIGNATURE_TOKEN_INVALID,
					}),
				},
				"Unauthorized Signature": {
					value: BaseApiResponse.unauthorized({
						message: JwtTokenError.ERR_SIGNATURE_TOKEN_UNAUTHORIZED,
					}),
				},
			},
		},
	};

	static readonly AUTH_ACCOUNT_NOT_FOUND: ContentObject = {
		"application/json": {
			example: {
				message: BaseApiResponse.notFound({
					message: AuthErrorMessage.ERR_ACCOUNT_NOT_FOUND,
				}),
			},
		},
	};
}
