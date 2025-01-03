import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base-entity.interface";
import { INutritionistEntity } from "./nutritionist-entity.interface";

export interface IRegistrationCertificateEntity
	extends IBaseEntity,
		Prisma.RegistrationCertificateGetPayload<{
			select: (typeof PrismaSelector)["REGISTRATION_CERTIFICATE"];
		}> {
	nutritionist?: INutritionistEntity;
	nutritionistId?: string;
}
