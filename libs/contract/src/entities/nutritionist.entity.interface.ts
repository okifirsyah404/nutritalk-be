import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IAccountEntity } from "./account.entity.interface";
import { IBaseEntity } from "./base/base.entity.interface";
import { IConsultationMetaEntity } from "./consultation-meta.entity.interface";
import { IConsultationEntity } from "./consultation.entity.interface";
import { IOccupationEntity } from "./occupation.entity.interface";
import { IPriceEntity } from "./price.entity.interface";
import { IProfileEntity } from "./profile.entity.interface";
import { IRegistrationCertificateEntity } from "./registration-certificate.entity.interface";
import { IScheduleEntity } from "./schedule.entity.interface";

export interface INutritionistEntity
	extends IBaseEntity,
		Prisma.NutritionistGetPayload<{
			select: (typeof PrismaSelector)["NUTRITIONIST"];
		}> {
	accountId?: string;
	profileId?: string;
	account?: IAccountEntity;
	profile?: IProfileEntity;
	consultationMeta?: IConsultationMetaEntity;
	occupation?: IOccupationEntity;
	price?: IPriceEntity;
	registrationCertificate?: IRegistrationCertificateEntity;
	schedules?: IScheduleEntity[];
	transactions?: IConsultationEntity[];
}
