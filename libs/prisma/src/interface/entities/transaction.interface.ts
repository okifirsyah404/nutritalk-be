import { ConsultationType, TransactionStatus } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';
import { IConsultationReview } from './consultation-review.interface';
import { IConsultationTime } from './consultation-time.interface';
import { INutritionist } from './nutritionist.interface';
import { IPatient } from './patient.interface';
import { ITransactionPayment } from './transaction-payment.interface';
import { ITransactionPrice } from './transaction-price.interface';

export interface ITransaction extends IBaseEntity {
  status: TransactionStatus;
  type: ConsultationType;
  note?: string | null;
  patientId?: string | null;
  nutritionistId?: string | null;
  patient?: IPatient | null;
  nutritionist?: INutritionist | null;
  consultationTime?: IConsultationTime | null;
  transactionPrice?: ITransactionPrice | null;
  transactionPayment?: ITransactionPayment | null;
  consultationReview?: IConsultationReview | null;
}
