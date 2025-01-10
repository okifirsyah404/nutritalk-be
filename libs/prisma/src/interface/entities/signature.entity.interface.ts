import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";

export interface ISignatureEntity
	extends IBaseEntity,
		Prisma.SignatureGetPayload<{
			select: (typeof PrismaSelector)["SIGNATURE"];
		}> {}
