import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IAnthropometricEntity } from "./anthropometric.entity.interface";
import { IBaseEntity } from "./base/base.entity.interface";
import { IMedicalRecordKeyEntity } from "./medical-record-key.entity.interface";
import { INutritionCarePlanEntity } from "./nutrition-care-plan.entity.interface";

export interface IPatientDetailEntity
	extends IBaseEntity,
		Prisma.PatientDetailGetPayload<{
			select: (typeof PrismaSelector)["PATIENT_DETAIL"];
		}> {
	anthropometric: IAnthropometricEntity;
	nutritionCarePlan: INutritionCarePlanEntity;
	medicalRecordKey?: IMedicalRecordKeyEntity;
	medicalRecordKeyId?: string;
	anthropometricId?: string;
	nutritionCarePlanId?: string;
}
