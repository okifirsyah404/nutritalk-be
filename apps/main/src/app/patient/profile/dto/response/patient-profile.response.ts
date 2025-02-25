import { IAccountEntity, IPatientEntity, IProfileEntity } from "@contract";

export class PatientProfileResponse implements IPatientEntity {
	private constructor(entity: IPatientEntity) {
		this.id = entity.id;
		this.account = entity.account;
		this.profile = entity.profile;
	}

	id: string;
	account?: IAccountEntity;
	profile?: IProfileEntity;

	static fromEntity(entity: IPatientEntity): PatientProfileResponse {
		return new PatientProfileResponse(entity);
	}
}
