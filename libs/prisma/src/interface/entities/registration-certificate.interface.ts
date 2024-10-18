import { IBaseEntity } from './base/base.interface';
import { INutritionist } from './nutritionist.interface';

export interface IRegistrationCertificate extends IBaseEntity {
  registrationNumber: string;
  issueDate?: Date | null;
  validUntil?: Date | null;

  nutritionistId?: string | null;

  nutritionist?: INutritionist | null;
}
