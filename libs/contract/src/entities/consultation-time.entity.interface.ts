import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationEntity } from "./consultation.entity.interface";

export interface IConsultationTimeEntity
	extends IBaseEntity,
		Prisma.ConsultationTimeGetPayload<{
			select: (typeof PrismaSelector)["CONSULTATION_TIME"];
		}> {
	consultationId?: string;
	transaction?: IConsultationEntity;
}
