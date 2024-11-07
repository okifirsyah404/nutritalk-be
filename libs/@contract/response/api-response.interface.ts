import { IPaginationMeta } from '../pagination/pagination.interface';

export interface IApiResponse<T> {
  statusCode: number;
  status: string;
  timestamp: number;
  message: string;
  data: T;
}

export interface IApiPaginationResponse<T> extends IApiResponse<T[]> {
  pagination: IPaginationMeta;
  data: T[];
}
