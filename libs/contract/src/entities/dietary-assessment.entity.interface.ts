import { PrismaSelector } from "@config/prisma";
import { IMedicalRecordHistoryEntity } from "@contract";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";

export interface IDietaryAssessmentEntity
	extends IBaseEntity,
		Prisma.DietaryAssessmentGetPayload<{
			select: (typeof PrismaSelector)["DIETARY_ASSESSMENT"];
		}> {
	medicalRecordHistory?: IMedicalRecordHistoryEntity;
}
