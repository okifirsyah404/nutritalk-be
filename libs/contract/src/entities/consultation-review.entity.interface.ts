import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationEntity } from "./transaction.entity.interface";

export interface IConsultationReviewEntity
	extends IBaseEntity,
		Prisma.ConsultationReviewGetPayload<{
			select: (typeof PrismaSelector)["CONSULTATION_REVIEW"];
		}> {
	consultationId?: string;
	transaction?: IConsultationEntity;
}
