import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IMedicalRecordEntity } from "./medical-record.entity.interface";
import { IPatientDetailEntity } from "./patient-detail.entity.interface";
import { IPatientEntity } from "./patient.entity.interface";

export interface IMedicalRecordKeyEntity
	extends IBaseEntity,
		Prisma.MedicalRecordKeyGetPayload<{
			select: (typeof PrismaSelector)["MEDICAL_RECORD_KEY"];
		}> {
	patiet?: IPatientEntity;
	patientDetails?: IPatientDetailEntity;
	medicalRecords?: IMedicalRecordEntity[];
}
