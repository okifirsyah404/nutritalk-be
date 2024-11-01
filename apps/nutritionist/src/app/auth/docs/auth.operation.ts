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

  static readonly AUTH_REQUEST_OTP_FORGET_PASSWORD: ApiOperationOptions = {
    summary: 'Request OTP for forget password',
    description:
      'Http endpoint for requesting an OTP to reset the password.\n\nRequest body:\n- email: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken',
  };

  static readonly AUTH_VERIFY_OTP_FORGET_PASSWORD: ApiOperationOptions = {
    summary: 'Verify OTP for forget password',
    description:
      'Http endpoint for verifying the OTP to reset the password.\n\nRequest body:\n- email: (required) string\n- otp: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of signature',
  };

  static readonly AUTH_RESET_PASSWORD: ApiOperationOptions = {
    summary: 'Reset password',
    description:
      'Http endpoint for resetting the password.\n\nRequest body:\n- password: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of email',
  };
}
