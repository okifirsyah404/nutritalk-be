import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IBaseEntity } from './base/base-entity.interface';

export interface IOtpEntity
  extends Prisma.OtpGetPayload<{
      select: (typeof PrismaSelector)['OTP'];
    }>,
    IBaseEntity {}
