import {
	IMedicalRecordKeyEntity,
	IPatientEntity,
	IProfileEntity,
} from "@contract";

export class NutritionistPatientResponse implements IPatientEntity {
	private constructor(entity: IPatientEntity) {
		this.id = entity.id;
		this.profile = entity.profile;
		this.medicalRecordKey = entity.medicalRecordKey;
	}

	id: string;
	profile?: IProfileEntity;
	medicalRecordKey?: IMedicalRecordKeyEntity;

	static fromEntity(entity: IPatientEntity): NutritionistPatientResponse {
		return new NutritionistPatientResponse(entity);
	}

	static fromEntities(
		entities: IPatientEntity[],
	): NutritionistPatientResponse[] {
		return entities.map((entity) =>
			NutritionistPatientResponse.fromEntity(entity),
		);
	}
}
