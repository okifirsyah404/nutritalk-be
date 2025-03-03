import { IPatientDetailEntity } from "@contract/entities/patient-detail.entity.interface";

export interface ICreateMedicalRecordKey
	extends Partial<
		Omit<
			IPatientDetailEntity,
			| "id"
			| "createdAt"
			| "updatedAt"
			| "dietGoal"
			| "dietPlan"
			| "age"
			| "bmi"
			| "bmiStatus"
			| "dietPlanDescription"
			| "dailyCalories"
			| "medicalRecordKey"
			| "medicalRecordKeyId"
		>
	> {
	patientId?: string;
}
