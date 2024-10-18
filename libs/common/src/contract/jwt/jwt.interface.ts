import { Role } from '@prisma/client';

export interface IJwtAccessPayload {
  sub: string;
  email: string;
  role: Role;
}

export interface IJwtRefreshPayload {
  sub: string;
  email: string;
}

export interface IJwtSignaturePayload {
  sub: string;
  email: string;
}

export interface IJwtToken {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtRefresh {
  token: string;
  payload: IJwtRefreshPayload;
}
