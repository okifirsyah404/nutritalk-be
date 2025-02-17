export abstract class JWTTokenValidationMessage {
	static readonly ERR_JWT_TOKEN = "ERR_JWT_TOKEN";
	static readonly ERR_JWT_TOKEN_INVALID = "ERR_JWT_TOKEN_INVALID";
	static readonly ERR_JWT_TOKEN_EXPIRED = "ERR_JWT_TOKEN_EXPIRED";
	static readonly ERR_JWT_TOKEN_MUST_BE_STRING = "ERR_JWT_TOKEN_MUST_BE_STRING";
	static readonly ERR_JWT_TOKEN_REQUIRED = "ERR_JWT_TOKEN_REQUIRED";
	static readonly ERR_JWT_TOKEN_MUST_BE_JWT = "ERR_JWT_TOKEN_MUST_BE_JWT";

	static readonly ERR_GOOGLE_JWT_TOKEN = "ERR_GOOGLE_JWT_TOKEN";
	static readonly ERR_GOOGLE_JWT_TOKEN_INVALID = "ERR_GOOGLE_JWT_TOKEN_INVALID";
	static readonly ERR_GOOGLE_JWT_TOKEN_EXPIRED = "ERR_GOOGLE_JWT_TOKEN_EXPIRED";
	static readonly ERR_GOOGLE_JWT_TOKEN_MUST_BE_STRING =
		"ERR_GOOGLE_JWT_TOKEN_MUST_BE_STRING";
	static readonly ERR_GOOGLE_JWT_TOKEN_REQUIRED =
		"ERR_GOOGLE_JWT_TOKEN_REQUIRED";
	static readonly ERR_GOOGLE_JWT_TOKEN_MUST_BE_JWT =
		"ERR_GOOGLE_JWT_TOKEN_MUST_BE_JWT";
}
