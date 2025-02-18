import { Prisma } from "@prisma/client";
import { PrismaSelector } from "@config/prisma";
import { IBaseEntity } from "./base/base.entity.interface";
import { IRoleEntity } from "./role.entity.interface";

export interface IRolePermissionEntity
	extends IBaseEntity,
		Prisma.RolePermissionGetPayload<{
			select: (typeof PrismaSelector)["ROLE_PERMISSION"];
		}> {
	roleId?: string;
	basePermissionId?: string;
	role?: IRoleEntity;
}
