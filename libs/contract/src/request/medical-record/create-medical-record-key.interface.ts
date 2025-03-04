import { IAnthropometricEntity, IPatientDetailEntity } from "@contract";

export interface ICreateMedicalRecordKey
	extends Pick<IPatientDetailEntity, "dailyCalories" | "activityLevel">,
		Pick<IAnthropometricEntity, "height" | "weight" | "bmi" | "bmiStatus"> {
	patientId?: string;
}
