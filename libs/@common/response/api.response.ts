import { IApiResponse } from '@contract/response/api-response.interface';

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
      status: 'Success',
      statusCode,
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
      status: 'Created',
      statusCode,
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
      status: 'Bad Request',
      statusCode,
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
      status: 'Unauthorized',
      statusCode,
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
      status: 'Not Found',
      statusCode,
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
      status: 'Forbidden',
      statusCode,
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
      status: 'Conflict',
      statusCode,
      message,
      data: undefined,
    });
  }
}
