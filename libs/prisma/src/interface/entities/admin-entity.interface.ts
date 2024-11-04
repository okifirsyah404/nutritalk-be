import { Prisma } from '@prisma/client';

export interface IAdmin extends Partial<Prisma.AdminGetPayload<{}>> {}
