import { OtpPurpose } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';

export interface IOtp extends IBaseEntity {
  email: string;
  code: string;
  purpose: OtpPurpose;
  expired: Date;
}
