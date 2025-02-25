import { IAuthResponse } from "@contract";
import { AccountRole } from "@prisma/client";

export class PatientAuthResponse implements IAuthResponse {
	private constructor({
		accessToken,
		refreshToken,
		accountRole,
	}: IAuthResponse) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.accountRole = accountRole;
	}

	accountRole: AccountRole;
	accessToken: string;
	refreshToken: string;

	static fromEntity(entity: IAuthResponse): PatientAuthResponse {
		return new PatientAuthResponse(entity);
	}
}
