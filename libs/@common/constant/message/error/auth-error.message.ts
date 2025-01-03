export abstract class AuthErrorMessage {
	// Token Error
	static readonly ERR_TOKEN_EXPIRED = "ERR_TOKEN_EXPIRED";
	static readonly ERR_TOKEN_INVALID = "ERR_TOKEN_INVALID";
	static readonly ERR_TOKEN_UNAUTHORIZED = "ERR_TOKEN_UNAUTHORIZED";

	// Account Error
	static readonly ERR_ACCOUNT_NOT_FOUND = "ERR_ACCOUNT_NOT_FOUND";
	static readonly ERR_ACCOUNT_NOT_ADMIN = "ERR_ACCOUNT_NOT_ADMIN";
	static readonly ERR_ACCOUNT_NOT_PATIENT = "ERR_ACCOUNT_NOT_PATIENT";
	static readonly ERR_ACCOUNT_NOT_NUTRITIONIST = "ERR_ACCOUNT_NOT_NUTRITIONIST";
	static readonly ERR_PASSWORD_NOT_MATCH = "ERR_PASSWORD_NOT_MATCH";
	static readonly ERR_ACCOUNT_ALREADY_EXIST = "ERR_ACCOUNT_ALREADY_EXIST";
	static readonly ERR_ACCOUNT_ALREADY_SIGN_OUT = "ERR_ACCOUNT_ALREADY_SIGN_OUT";

	// OTP Error
	static readonly ERR_OTP_EXPIRED = "ERR_OTP_EXPIRED";
	static readonly ERR_OTP_INVALID = "ERR_OTP_INVALID";

	// Signature Error
	static readonly ERR_SIGNATURE_INVALID = "ERR_SIGNATURE_INVALID";
}
