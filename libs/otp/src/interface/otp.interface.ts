import { OtpPurpose } from '@prisma/client';

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
  expiration: Date;
  expiry: OtpExpirateDuration;
}

export interface GetOtpParam extends OtpParam {
  purpose: OtpPurpose;
}

export interface DeleteOtpParam extends OtpParam {}

export interface OtpExpirateDuration {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface OtpGeneratedResult extends OtpParam {
  purpose: OtpPurpose;
  expiration: Date;
  expiry?: OtpExpirateDuration;
}
