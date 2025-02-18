import { Prisma } from "@prisma/client";
import { IBaseEntity } from "./base/base.entity.interface";
import { PrismaSelector } from "@config/prisma";

export interface ISignatureEntity
	extends IBaseEntity,
		Prisma.SignatureGetPayload<{
			select: (typeof PrismaSelector)["SIGNATURE"];
		}> {}
