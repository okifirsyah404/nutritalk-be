import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IAccountEntity } from "./account.entity.interface";
import { IBaseEntity } from "./base/base.entity.interface";
import { IProfileEntity } from "./profile.entity.interface";
import { IMedicalRecordKeyEntity } from "./medical-record-key.entity.interface";
import { ICreditEntity } from "./credit.entity.interface";
import { ITransactionEntity } from "./transaction.entity.interface";

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
	transactions?: ITransactionEntity[];
}
