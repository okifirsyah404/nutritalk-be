import { PaymentSource } from '@prisma/client';
import { ITransactionEntity } from './transaction-entity.interface';

export interface ITransactionPrice {
  source?: PaymentSource[] | null;
  price: number;
  subTotal: number;
  credit: number;
  total: number;
  transactionId?: string | null;
  transaction?: ITransactionEntity | null;
}
