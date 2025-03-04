import { ICreateMedicalRecordKey } from "@contract";
import { PatientActivity } from "@prisma/client";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import {
	MedicalRecordValidationMessage,
	PatientValidationMessage,
} from "@constant/message";

export class NutritionistCreateMedicalRecordKeyRequest
	implements ICreateMedicalRecordKey
{
	@IsString({
		message: PatientValidationMessage.ERR_PATIENT_ID_MUST_BE_STRING,
	})
	@IsOptional()
	patientId?: string;

	@IsEnum(PatientActivity, {
		message: MedicalRecordValidationMessage.ERR_ACTIVITY_LEVEL_MUST_BE_ENUM,
	})
	@IsOptional()
	activityLevel?: PatientActivity;

	@IsInt({
		message: MedicalRecordValidationMessage.ERR_DAILY_CALORIES_MUST_BE_NUMBER,
	})
	@IsOptional()
	dailyCalories?: number;

	@IsInt({
		message: MedicalRecordValidationMessage.ERR_HEIGHT_MUST_BE_NUMBER,
	})
	@IsOptional()
	height?: number;

	@IsInt({
		message: MedicalRecordValidationMessage.ERR_WEIGHT_MUST_BE_NUMBER,
	})
	@IsOptional()
	weight?: number;
}
