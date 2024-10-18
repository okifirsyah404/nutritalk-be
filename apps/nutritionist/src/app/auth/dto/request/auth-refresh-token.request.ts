import { PickType } from '@nestjs/swagger';
import { AuthSignInRequest } from './auth-sign-in.request';

export class AuthRefreshTokenRequest extends PickType(AuthSignInRequest, [
  'fcmToken',
] as const) {}
