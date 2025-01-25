import { Prisma } from "@prisma/client";
import { PrismaSelector } from "@config/prisma";
import { IBaseEntity } from "./base/base.entity.interface";
import { INutritionistEntity } from "./nutritionist.entity.interface";

export interface IRegistrationCertificateEntity
	extends IBaseEntity,
		Prisma.RegistrationCertificateGetPayload<{
			select: (typeof PrismaSelector)["REGISTRATION_CERTIFICATE"];
		}> {
	nutritionistId?: string;
	nutritionist?: INutritionistEntity;
}
