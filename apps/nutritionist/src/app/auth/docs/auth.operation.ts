import { ApiOperationOptions } from '@nestjs/swagger';

export abstract class AuthOperationDocs {
  static readonly AUTH_SIGN_IN: ApiOperationOptions = {
    summary: 'Sign in',
    description:
      'Http endpoint for signing up a user.\n\nRequest body:\n- email: (required) string\n- password: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken',
  };

  static readonly AUTH_REFRESH_TOKEN: ApiOperationOptions = {
    summary: 'Refresh token',
    description:
      'Http endpoint for refreshing the access token.\n\nRequest header:\n- x-refresh-token: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken',
  };

  static readonly AUTH_SIGN_OUT: ApiOperationOptions = {
    summary: 'Sign out',
    description:
      'Http endpoint for signing out a user.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: undefined',
  };
}
