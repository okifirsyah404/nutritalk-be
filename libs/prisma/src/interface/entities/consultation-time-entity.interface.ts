import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IBaseEntity } from './base/base-entity.interface';
import { ITransactionEntity } from './transaction-entity.interface';

export interface IConsultationTime
  extends IBaseEntity,
    Prisma.ConsultationTimeGetPayload<{
      select: (typeof PrismaSelector)['CONSULTATION_TIME'];
    }> {
  transaction?: ITransactionEntity;
  transactionId?: string;
}
