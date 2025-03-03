import {
	IMedicalRecordKeyEntity,
	IPatientDetailEntity,
	IPatientEntity,
} from "@contract";

export class NutritionistMedicalRecordKeyResponse
	implements IMedicalRecordKeyEntity
{
	private constructor(entity: IMedicalRecordKeyEntity) {
		this.id = entity.id;
		this.code = entity.code;
		this.patient = entity.patient;
		this.patientDetail = entity.patientDetail;
	}

	id: string;
	code: string;
	patient?: IPatientEntity;
	patientDetail?: IPatientDetailEntity;

	static fromEntity(
		entity: IMedicalRecordKeyEntity,
	): NutritionistMedicalRecordKeyResponse {
		return new NutritionistMedicalRecordKeyResponse(entity);
	}

	static fromEntities(
		entities: IMedicalRecordKeyEntity[],
	): NutritionistMedicalRecordKeyResponse[] {
		return entities.map((entity) =>
			NutritionistMedicalRecordKeyResponse.fromEntity(entity),
		);
	}
}
