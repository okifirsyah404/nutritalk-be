import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IBaseEntity } from './base/base-entity.interface';
import { INutritionistEntity } from './nutritionist-entity.interface';

export interface IOccupationEntity
  extends IBaseEntity,
    Prisma.OccupationGetPayload<{
      select: (typeof PrismaSelector)['OCCUPATION'];
    }> {
  nutritionist?: INutritionistEntity;
  nutritionistId?: string;
}
