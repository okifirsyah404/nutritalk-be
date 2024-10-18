import { IBaseEntity } from './base/base.interface';
import { INutritionist } from './nutritionist.interface';

export interface IOccupation extends IBaseEntity {
  name: string;
  workPlace: string;
  experience: number;

  nutritionistId?: string | null;

  nutritionist?: INutritionist | null;
}
