import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IBaseEntity } from './base/base-entity.interface';
import { INutritionistEntity } from './nutritionist-entity.interface';

export interface IConsultationMetaEntity
  extends IBaseEntity,
    Prisma.ConsultationMetaGetPayload<{
      select: (typeof PrismaSelector)['CONSULTATION_META'];
    }> {
  nutritionist?: INutritionistEntity;

  nutritionistId?: string;
}
