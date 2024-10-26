import { IApiResponse } from '@contract/contract/response/api-response.interface';

export class BaseApiResponse<T> implements IApiResponse<T> {
  constructor({
    status,
    statusCode,
    message,
    data,
  }: {
    status: string;
    statusCode: number;
    message: string;
    data: T;
  }) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.data = data;
  }

  readonly status: string;
  readonly statusCode: number;
  readonly message: string;
  readonly data: T;

  static success<T>({
    statusCode = 200,
    message,
    data,
  }: {
    statusCode?: number;
    message: string;
    data: T;
  }): BaseApiResponse<T> {
    return new BaseApiResponse<T>({
      statusCode,
      status: 'Success',
      message,
      data,
    });
  }

  static created<T>({
    statusCode = 201,
    message,
    data,
  }: {
    statusCode?: number;
    message: string;
    data: T;
  }): BaseApiResponse<T> {
    return new BaseApiResponse<T>({
      statusCode,
      status: 'Created',
      message,
      data,
    });
  }

  static badRequest({
    statusCode = 400,
    message,
  }: {
    statusCode?: number;
    message: string;
  }): BaseApiResponse<undefined> {
    return new BaseApiResponse<undefined>({
      statusCode,
      status: 'Bad Request',
      message,
      data: undefined,
    });
  }

  static unauthorized({
    statusCode = 401,
    message,
  }: {
    statusCode?: number;
    message: string;
  }): BaseApiResponse<undefined> {
    return new BaseApiResponse<undefined>({
      statusCode,
      status: 'Unauthorized',
      message,
      data: undefined,
    });
  }

  static notFound({
    statusCode = 404,
    message,
  }: {
    statusCode?: number;
    message: string;
  }): BaseApiResponse<undefined> {
    return new BaseApiResponse<undefined>({
      statusCode,
      status: 'Not Found',
      message,
      data: undefined,
    });
  }

  static forbidden({
    statusCode = 403,
    message,
  }: {
    statusCode?: number;
    message: string;
  }): BaseApiResponse<undefined> {
    return new BaseApiResponse<undefined>({
      statusCode,
      status: 'Forbidden',
      message,
      data: undefined,
    });
  }

  static conflict({
    statusCode = 409,
    message,
  }: {
    statusCode?: number;
    message: string;
  }): BaseApiResponse<undefined> {
    return new BaseApiResponse<undefined>({
      statusCode,
      status: 'Conflict',
      message,
      data: undefined,
    });
  }
}
