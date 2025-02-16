import { AccountRole } from "@prisma/client";

export interface IJwtPayload {
	userId: string;
	accountId: string;
}

export interface IJwtAccessPayload extends IJwtPayload {
	role: string;
}

export interface IJwtRefreshPayload extends IJwtPayload {}

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

export interface JwtGenerateTokensParam extends IJwtPayload {
	userId: string;
	role: AccountRole;
}

export interface JwtGenerateTokensOptionsParam {
	saveAfterGenerate?: boolean;
}
