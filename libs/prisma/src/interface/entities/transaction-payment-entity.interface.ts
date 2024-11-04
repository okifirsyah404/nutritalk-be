import { ITransactionEntity } from './transaction-entity.interface';

export interface ITransactionPayment {
  method?: string | null;
  code?: string | null;
  status?: string | null;
  date?: Date | null;
  transactionId?: string | null;
  transaction?: ITransactionEntity | null;
}
