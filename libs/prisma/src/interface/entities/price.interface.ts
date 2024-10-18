import { IBaseEntity } from './base/base.interface';
import { INutritionist } from './nutritionist.interface';

export interface IPriceEntity extends IBaseEntity {
  online: number;
  offline: number;

  nutritionistId?: string | null;

  nutritionist?: INutritionist | null;
}
