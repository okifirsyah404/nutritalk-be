import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IPatientEntity } from "./patient.entity.interface";
import { IPatientDetailEntity } from "./patient-detail.entity.interface";
import { IMedicalRecordEntity } from "./medical-record.entity.interface";

export interface IMedicalRecordKeyEntity
	extends IBaseEntity,
		Prisma.MedicalRecordKeyGetPayload<{
			select: (typeof PrismaSelector)["MEDICAL_RECORD_KEY"];
		}> {
	patiet?: IPatientEntity;
	patientDetails?: IPatientDetailEntity;
	medicalRecords?: IMedicalRecordEntity[];
}
