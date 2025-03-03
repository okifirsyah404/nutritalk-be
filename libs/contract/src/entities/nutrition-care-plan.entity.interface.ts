import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IPatientDetailEntity } from "./patient-detail.entity.interface";

export interface INutritionCarePlanEntity
	extends IBaseEntity,
		Prisma.NutritionCarePlanGetPayload<{
			select: (typeof PrismaSelector)["NUTRITION_CARE_PLAN"];
		}> {
	patientDetail?: IPatientDetailEntity;
}
