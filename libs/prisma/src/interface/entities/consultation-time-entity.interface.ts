import { Prisma } from '@prisma/client';
import { ITransactionEntity } from './transaction-entity.interface';

export interface IConsultationTime
  extends Prisma.ConsultationTimeGetPayload<{}> {
  transaction?: ITransactionEntity | null;
}
