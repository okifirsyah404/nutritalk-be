import { IPreRegisterRequest } from "@contract";
import { IntersectionType } from "@nestjs/mapped-types";
import { PatientForgetPasswordRequest } from "@app/app/patient/auth/dto/request/patient-forget-password.request";
import { PickType } from "@nestjs/swagger";
import { PatientAuthSignInRequest } from "@app/app/patient/auth/dto/request/patient-auth-sign-in.request";

export class PatientAuthPreRegisterRequest
	extends IntersectionType(
		PatientForgetPasswordRequest,
		PickType(PatientAuthSignInRequest, ["fcmToken"]),
	)
	implements IPreRegisterRequest {}
