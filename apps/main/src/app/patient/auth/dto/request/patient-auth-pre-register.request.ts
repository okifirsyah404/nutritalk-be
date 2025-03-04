import { PatientAuthSignInRequest } from "@app/app/patient/auth/dto/request/patient-auth-sign-in.request";
import { PatientForgetPasswordRequest } from "@app/app/patient/auth/dto/request/patient-forget-password.request";
import { IPreRegisterRequest } from "@contract";
import { IntersectionType } from "@nestjs/mapped-types";
import { PickType } from "@nestjs/swagger";

export class PatientAuthPreRegisterRequest
	extends IntersectionType(
		PatientForgetPasswordRequest,
		PickType(PatientAuthSignInRequest, ["fcmToken"]),
	)
	implements IPreRegisterRequest {}
