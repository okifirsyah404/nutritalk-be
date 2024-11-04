import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IBaseEntity } from './base/base-entity.interface';
import { INutritionistEntity } from './nutritionist-entity.interface';
import { IPatientEntity } from './patient-entity.interface';

export interface IAccountEntity
  extends IBaseEntity,
    Prisma.AccountGetPayload<{
      select: (typeof PrismaSelector)['ACCOUNT'];
    }> {
  password?: string;

  fcmToken?: string;

  refreshToken?: string;

  patient?: IPatientEntity;

  nutritionist?: INutritionistEntity;
}
