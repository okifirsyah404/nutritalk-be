import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IMedicalRecordKeyEntity } from "./medical-record-key.entity.interface";

export interface IMedicalRecordEntity
	extends IBaseEntity,
		Prisma.MedicalRecordGetPayload<{
			select: (typeof PrismaSelector)["MEDICAL_RECORD"];
		}> {
	medicalRecordKeyId?: string;
	medicalRecordKey?: IMedicalRecordKeyEntity;
}
