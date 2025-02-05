import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IAccountEntity } from "./account.entity.interface";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationEntity } from "./consultation.entity.interface";
import { ICreditEntity } from "./credit.entity.interface";
import { IMedicalRecordKeyEntity } from "./medical-record-key.entity.interface";
import { IProfileEntity } from "./profile.entity.interface";

export interface IPatientEntity
	extends IBaseEntity,
		Prisma.PatientGetPayload<{
			select: (typeof PrismaSelector)["PATIENT"];
		}> {
	accountId?: string;
	profileId?: string;
	medicalRecordKeyId?: string;
	profile?: IProfileEntity;
	account?: IAccountEntity;
	medicalRecordKey?: IMedicalRecordKeyEntity;
	credit?: ICreditEntity;
	transactions?: IConsultationEntity[];
}
