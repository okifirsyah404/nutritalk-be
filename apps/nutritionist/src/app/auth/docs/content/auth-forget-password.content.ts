import { BaseApiResponse } from "@common";
import {
	AccountErrorMessage,
	AuthErrorMessage,
	AuthSuccessMessage,
	EmailValidationMessage,
	JwtTokenError,
	OtpErrorMessage,
	OtpSuccessMessage,
	OtpValidationMessage,
	PasswordValidationMessage,
	SignatureValidationMessage,
} from "@constant/message";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { AuthForgetPasswordResponse } from "../../dto/response/auth-forget-password.response";
import { AuthOtpVerifyForgetPasswordResponse } from "../../dto/response/auth-otp-forget-password.response";
export abstract class AuthForgetPasswordContent {
	static readonly AUTH_REQUEST_OTP_FORGET_PASSWORD_SUCCESS: ContentObject = {
		"application/json": {
			example: {
				message: BaseApiResponse.created({
					message: OtpSuccessMessage.SUCCESS_SEND_OTP,
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
					message: OtpSuccessMessage.SUCCESS_VERIFY_OTP,
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
						message: OtpErrorMessage.ERR_OTP_INVALID,
					}),
				},
			},
		},
	};

	static readonly AUTH_RESET_PASSWORD_SUCCESS: ContentObject = {
		"application/json": {
			example: {
				message: BaseApiResponse.created({
					message: AuthSuccessMessage.SUCCESS_RESET_PASSWORD,
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
					message: AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND,
				}),
			},
		},
	};
}
