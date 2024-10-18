import { IBaseEntity } from './base/base.interface';

export interface IFaq extends IBaseEntity {
  question: string;
  answer: string;
}
