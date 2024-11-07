import { ApiOperationOptions } from '@nestjs/swagger';

export abstract class AccountOperation {
  static readonly GET_ACCOUNT: ApiOperationOptions = {
    summary: 'Get Account',
    description:
      'Http endpoint for getting the account of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of account information',
  };
}
