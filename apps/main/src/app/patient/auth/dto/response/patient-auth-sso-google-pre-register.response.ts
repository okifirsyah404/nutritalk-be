import { IGoogleUser, IOtpVerifyResponse } from "@contract";

export class PatientAuthSSOGooglePreRegisterResponse
	implements IOtpVerifyResponse, Pick<IGoogleUser, "displayName">
{
	private constructor({
		signature,
		email,
		displayName,
	}: IOtpVerifyResponse & Pick<IGoogleUser, "displayName">) {
		this.signature = signature;
		this.email = email;
		this.displayName = displayName;
	}

	signature: string;
	email: string;
	displayName: string;

	static fromEntity(
		entity: IOtpVerifyResponse & Pick<IGoogleUser, "displayName">,
	): PatientAuthSSOGooglePreRegisterResponse {
		return new PatientAuthSSOGooglePreRegisterResponse(entity);
	}
}
