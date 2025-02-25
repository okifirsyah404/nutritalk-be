import { PickType } from "@nestjs/swagger";
import { PatientAuthSignInRequest } from "@app/app/patient/auth/dto/request/patient-auth-sign-in.request";
import { IOtpEmail } from "@contract";

export class PatientAuthSendOtpRequest
	extends PickType(PatientAuthSignInRequest, ["email"])
	implements IOtpEmail {}
