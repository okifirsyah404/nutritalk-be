import PrismaSelector from '@database/prisma/helper/prisma.selector';
import { Prisma } from '@prisma/client';
import { IBaseEntity } from './base/base-entity.interface';
import { IConsultationReview } from './consultation-review-entity.interface';
import { IConsultationTime } from './consultation-time-entity.interface';
import { INutritionistEntity } from './nutritionist-entity.interface';
import { IPatientEntity } from './patient-entity.interface';
import { ITransactionPayment } from './transaction-payment-entity.interface';
import { ITransactionPrice } from './transaction-price-entity.interface';

export interface ITransactionEntity
  extends IBaseEntity,
    Prisma.TransactionGetPayload<{
      select: (typeof PrismaSelector)['TRANSACTION'];
    }> {
  patientId?: string;
  nutritionistId?: string;
  patient?: IPatientEntity;
  nutritionist?: INutritionistEntity;
  consultationTime?: IConsultationTime;
  transactionPrice?: ITransactionPrice;
  transactionPayment?: ITransactionPayment;
  consultationReview?: IConsultationReview;
}
