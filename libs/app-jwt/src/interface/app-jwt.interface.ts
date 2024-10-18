import { Role } from '@prisma/client';

export interface IJwtPayload {
  sub: string;
  email: string;
}

export interface IJwtAccessPayload extends IJwtPayload {
  role: string;
}

export interface IJwtRefreshPayload extends IJwtPayload {}

export interface IJwtSignaturePayload extends IJwtPayload {}

export interface IJwtToken {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtRefresh {
  token: string;
  payload: IJwtRefreshPayload;
}

export interface JwtGenerateTokensParam extends IJwtPayload {
  userId: string;
  role: Role;
}

export interface JwtGenerateTokensOptionsParam {
  saveAfterGenerate?: boolean;
}
