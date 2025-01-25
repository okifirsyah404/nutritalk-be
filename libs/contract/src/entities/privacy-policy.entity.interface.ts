import { PrismaSelector } from "@config/prisma";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";

export interface IPrivacyPolicyEntity
	extends IBaseEntity,
		Prisma.PrivacyPolicyGetPayload<{
			select: (typeof PrismaSelector)["PRIVACY_POLICY"];
		}> {}
