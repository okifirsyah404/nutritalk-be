import { IBaseEntity } from './base/base.interface';
import { ITransaction } from './transaction.interface';

export interface IConsultationReview extends IBaseEntity {
  rating: number;
  description?: string | null;
  transactionId?: string | null;
  transaction?: ITransaction | null;
}
