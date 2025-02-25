import { PickType } from "@nestjs/swagger";
import { PatientAuthSignInRequest } from "@app/app/patient/auth/dto/request/patient-auth-sign-in.request";

export class PatientAuthRefreshTokenRequest extends PickType(
	PatientAuthSignInRequest,
	["fcmToken"] as const,
) {}
