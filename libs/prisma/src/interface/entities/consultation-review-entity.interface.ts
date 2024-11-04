import { Prisma } from '@prisma/client';
import { ITransactionEntity } from './transaction-entity.interface';

export interface IConsultationReview
  extends Prisma.ConsultationReviewGetPayload<{}> {
  transaction?: ITransactionEntity | null;
}
