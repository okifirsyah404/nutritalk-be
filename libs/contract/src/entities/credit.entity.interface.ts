import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { ICreditHistoryEntity } from "./credit-history.entity.interface";
import { IPatientEntity } from "./patient.entity.interface";

export interface ICreditEntity
	extends IBaseEntity,
		Prisma.CreditGetPayload<{
			select: (typeof PrismaSelector)["CREDIT"];
		}> {
	patientId?: string;
	patient?: IPatientEntity;
	creditHistories?: ICreditHistoryEntity[];
}
