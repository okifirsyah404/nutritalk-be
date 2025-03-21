export enum NutritionistConsultationSortIndexQuery {
	CREATED_AT = "createdAt",
	UPDATED_AT = "updatedAt",
	STATUS = "status",
	TYPE = "type",
	START_DATE = "consultationTime.start",
	END_DATE = "consultationTime.end",
	PATIENT_NAME = "patient.profile.name",
}

export enum NutritionistPatientSortIndexQuery {
	CREATED_AT = "createdAt",
	UPDATED_AT = "updatedAt",
	NAME = "profile.name",
	MEDICAL_RECORD = "medicalRecordKey.code",
}
