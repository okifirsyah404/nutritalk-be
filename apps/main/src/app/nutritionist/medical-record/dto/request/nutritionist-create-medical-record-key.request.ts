import { ICreateMedicalRecordKey } from "@contract";
import { Gender, PatientActivity } from "@prisma/client";

export class NutritionistCreateMedicalRecordKeyRequest
	implements ICreateMedicalRecordKey
{
	patientId?: string;
	name?: string;
	activityLevel?: PatientActivity;
	dateOfBirth?: Date;
	gender?: Gender;
	height?: number;
	weight?: number;
}
