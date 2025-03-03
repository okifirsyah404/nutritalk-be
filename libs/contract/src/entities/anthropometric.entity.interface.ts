import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IMedicalRecordHistoryEntity } from "./medical-record-history.entity.interface";
import { IPatientDetailEntity } from "./patient-detail.entity.interface";

export interface IAnthropometricEntity
	extends IBaseEntity,
		Prisma.AnthropometricGetPayload<{
			select: (typeof PrismaSelector)["ANTHROPOMETRIC"];
		}> {
	patientDetail?: IPatientDetailEntity;
	medicalRecordHistory?: IMedicalRecordHistoryEntity;
}
