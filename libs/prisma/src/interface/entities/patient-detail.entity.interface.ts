import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IMedicalRecordKeyEntity } from "./medical-record-key.entity.interface";

export interface IPatientDetailEntity
	extends IBaseEntity,
		Prisma.PatientDetailGetPayload<{
			select: (typeof PrismaSelector)["PATIENT_DETAIL"];
		}> {
	medicalRecordKeyId?: string;
	medicalRecordKey?: IMedicalRecordKeyEntity;
}
