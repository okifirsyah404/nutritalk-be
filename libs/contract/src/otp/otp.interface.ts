import { OtpPurpose } from "@prisma/client";

export interface IOtpEmail {
	email: string;
}

export interface IOtpVerifyRequest extends IOtpEmail {
	otp: string;
}

export interface IOtpResponse extends IOtpEmail {
	expiryAt: Date;
}

export interface IOtpVerifyResponse extends IOtpEmail {
	signature: string;
}

export interface OtpParam {
	email: string;
	code: string;
}

export interface OtpGenerateParam {
	email: string;
	purpose: OtpPurpose;
	length?: number;
}

export interface OtpValidateParam extends OtpParam {
	purpose: OtpPurpose;
	deleteAfterValidation?: boolean;
}

export interface SaveOtpParam extends OtpParam {
	purpose: OtpPurpose;
	expiryAt: Date;
	expiry: OtpExpiryDuration;
}

export interface GetOtpParam extends OtpParam {
	purpose: OtpPurpose;
}

export interface DeleteOtpParam extends OtpParam {}

export interface OtpExpiryDuration {
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
}

export interface OtpGeneratedResult extends OtpParam {
	purpose: OtpPurpose;
	expiryAt: Date;
	expiry?: OtpExpiryDuration;
}
