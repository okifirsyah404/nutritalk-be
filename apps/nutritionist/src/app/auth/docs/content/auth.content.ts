import { BaseApiResponse } from "@common";
import { INVALID_TOKEN_CONTENT } from "@constant/content";
import {
	AccountErrorMessage,
	AuthErrorMessage,
	AuthSuccessMessage,
	EmailValidationMessage,
	FcmTokenValidationMessage,
	PasswordValidationMessage,
} from "@constant/message";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { AuthResponse } from "../../dto/response/auth.response";

export abstract class AuthContentDocs {
	static readonly AUTH_SIGN_IN_SUCCESS: ContentObject = {
		"application/json": {
			example: BaseApiResponse.created({
				message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_IN,
				data: AuthResponse.exampleData,
			}),
		},
	};

	static readonly AUTH_SIGN_IN_BAD_REQUEST: ContentObject = {
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
				"FCM Token Required": {
					value: BaseApiResponse.badRequest({
						message: FcmTokenValidationMessage.ERR_FCM_TOKEN_REQUIRED,
					}),
				},
				"FCM Token Must Be String": {
					value: BaseApiResponse.badRequest({
						message: FcmTokenValidationMessage.ERR_FCM_TOKEN_MUST_BE_STRING,
					}),
				},
			},
		},
	};

	static readonly AUTH_SIGN_IN_UNAUTHORIZED: ContentObject = {
		"application/json": {
			examples: {
				"Account Not Nutritionist": {
					value: BaseApiResponse.unauthorized({
						message: AccountErrorMessage.ERR_ACCOUNT_NOT_NUTRITIONIST,
					}),
				},
				"Password Not Match": {
					value: BaseApiResponse.unauthorized({
						message: AuthErrorMessage.ERR_PASSWORD_NOT_MATCH,
					}),
				},
			},
		},
	};

	static readonly AUTH_SIGN_OUT_SUCCESS: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_OUT,
				data: undefined,
			}),
		},
	};

	static readonly AUTH_SIGN_OUT_UNAUTHORIZED: ContentObject = {
		"application/json": {
			examples: {
				"Already Signed Out": {
					value: BaseApiResponse.unauthorized({
						message: AccountErrorMessage.ERR_ACCOUNT_ALREADY_SIGN_OUT,
					}),
				},
				...INVALID_TOKEN_CONTENT,
			},
		},
	};

	static readonly AUTH_REFRESH_TOKEN_SUCCESS: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: AuthSuccessMessage.SUCCESS_AUTH_REFRESH_TOKEN,
				data: AuthResponse.exampleData,
			}),
		},
	};

	static readonly AUTH_UNAUTHORIZED: ContentObject = {
		"application/json": {
			examples: {
				...INVALID_TOKEN_CONTENT,
			},
		},
	};

	static readonly AUTH_NOT_FOUND: ContentObject = {
		"application/json": {
			example: BaseApiResponse.notFound({
				message: AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND,
			}),
		},
	};
}
