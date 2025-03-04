import { ICreateMedicalRecordKey } from "@contract";
import { PatientActivity } from "@prisma/client";
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class NutritionistCreateMedicalRecordKeyRequest
	implements ICreateMedicalRecordKey
{
	@IsString()
	@IsOptional()
	patientId?: string;

	@IsEnum(PatientActivity)
	@IsOptional()
	activityLevel?: PatientActivity;

	@IsInt()
	@IsOptional()
	dailyCalories?: number;

	@IsDate()
	@IsOptional()
	dateOfBirth?: Date;

	@IsInt()
	@IsOptional()
	height?: number;

	@IsInt()
	@IsOptional()
	weight?: number;
}
