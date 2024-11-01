import { Role } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';
import { INutritionist } from './nutritionist.interface';
import { IPatient } from './patient.interface';

export interface IAccount extends IBaseEntity {
  email: string;
  password?: string;
  role: Role;
  googleId?: string | null;
  fcmToken?: string | null;
  refreshToken?: string | null;

  patient?: IPatient | null;
  nutritionist?: INutritionist | null;
}
