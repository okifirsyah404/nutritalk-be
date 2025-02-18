import { Prisma } from "@prisma/client";
import { PrismaSelector } from "@config/prisma";
import { IBaseEntity } from "./base/base.entity.interface";
import { IRolePermissionEntity } from "./role-permission.entity.interface";

export interface IRoleEntity
	extends IBaseEntity,
		Prisma.RoleGetPayload<{
			select: (typeof PrismaSelector)["ROLE"];
		}> {
	accountId?: string;
	permissions?: IRolePermissionEntity[];
}
