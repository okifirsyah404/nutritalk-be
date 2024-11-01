import { NutritionistType } from '@prisma/client';
import { IAccount } from './account.interface';
import { IBaseEntity } from './base/base.interface';
import { IConsultationMeta } from './consultation-meta.interface';
import { IOccupation } from './occupation.interface';
import { IPriceEntity } from './price.interface';
import { IProfile } from './profile.interface';
import { IRegistrationCertificate } from './registration-certificate.interface';
import { IScheduleEntity } from './schedule.interface';
import { ITransaction } from './transaction.interface';

export interface INutritionist extends IBaseEntity {
  type?: NutritionistType | null;
  nip?: string | null;
  nidn?: string | null;

  accountId?: string | null;
  profileId?: string | null;

  account?: IAccount | null;
  profile?: IProfile | null;
  consultationMeta?: IConsultationMeta | null;
  occupation?: IOccupation | null;
  price?: IPriceEntity | null;
  registrationCertificate?: IRegistrationCertificate | null;
  schedules?: IScheduleEntity[] | null;
  transactions?: ITransaction[] | null;
}
