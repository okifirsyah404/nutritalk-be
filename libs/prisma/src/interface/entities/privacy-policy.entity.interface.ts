import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";

export interface IPrivacyPolicyEntity
	extends IBaseEntity,
		Prisma.PrivacyPolicyGetPayload<{
			select: (typeof PrismaSelector)["PRIVACY_POLICY"];
		}> {}
