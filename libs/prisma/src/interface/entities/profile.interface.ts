import { Gender } from '@prisma/client';
import { IBaseEntity } from './base/base.interface';
import { INutritionist } from './nutritionist.interface';
import { IPatient } from './patient.interface';

export interface IProfile extends IBaseEntity {
  name: string;
  gender: Gender;
  phoneNumber?: string | null;
  address?: string | null;
  placeOfBirth?: string | null;
  dateOfBirth?: Date | null;
  age?: number | null;
  imageKey?: string | null;

  patient?: IPatient | null;
  nutritionist?: INutritionist | null;
}
