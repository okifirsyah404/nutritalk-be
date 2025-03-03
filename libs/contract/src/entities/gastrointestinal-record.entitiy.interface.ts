import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IMedicalRecordHistoryEntity } from "./medical-record-history.entity.interface";

export interface IGastrointestinalRecordEntity
	extends IBaseEntity,
		Prisma.GastrointestinalRecordGetPayload<{
			select: (typeof PrismaSelector)["GASTROINTESTINAL_RECORD"];
		}> {
	medicalRecordHistory?: IMedicalRecordHistoryEntity;
}
