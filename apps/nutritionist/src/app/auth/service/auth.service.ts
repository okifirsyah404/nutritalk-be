import {
  createDatabaseErrorHandler,
  IJwtRefresh,
  IJwtToken,
} from '@common/common';
import { AppConfigService } from '@config/app-config';
import { AppJwtService } from '@jwt/app-jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthErrorMessage } from 'apps/nutritionist/src/common/constant/message/error/auth-error.message';
import * as bcrypt from 'bcrypt';
import { AuthRefreshTokenRequest } from '../dto/request/auth-refresh-token.request';
import { AuthSignInRequest } from '../dto/request/auth-sign-in.request';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: AppConfigService,
    private readonly repository: AuthRepository,
    private readonly appJwtService: AppJwtService,
  ) {}

  async signIn(reqData: AuthSignInRequest): Promise<IJwtToken> {
    const result = await this.repository
      .findAccountByEmail(reqData.email)
      .catch(createDatabaseErrorHandler);

    if (!result) {
      throw new NotFoundException(AuthErrorMessage.ERR_ACCOUNT_NOT_FOUND);
    }

    if (result.role !== Role.NUTRITIONIST) {
      throw new UnauthorizedException(
        AuthErrorMessage.ERR_ACCOUNT_NOT_NUTRITIONIST,
      );
    }

    const isPasswordMatch = bcrypt.compareSync(
      reqData.password,
      result.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException(AuthErrorMessage.ERR_PASSWORD_NOT_MATCH);
    }

    this.repository
      .updateFcmToken(result.id, reqData.fcmToken)
      .catch(createDatabaseErrorHandler);

    const { accessToken, refreshToken } =
      await this.appJwtService.generateAuthTokens({
        sub: result.id,
        userId: result.nutritionist.id,
        role: Role.NUTRITIONIST,
        email: result.email,
      });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(
    token: IJwtRefresh,
    reqData: AuthRefreshTokenRequest,
  ): Promise<IJwtToken> {
    const nutritionistAccount = await this.repository.findAccountByEmail(
      token.payload.email,
    );

    const { accessToken, refreshToken } =
      await this.appJwtService.generateAuthTokens({
        sub: token.payload.sub,
        userId: nutritionistAccount.nutritionist.id,
        role: Role.NUTRITIONIST,
        email: token.payload.email,
      });

    this.repository
      .updateFcmToken(nutritionistAccount.id, reqData.fcmToken)
      .catch(createDatabaseErrorHandler);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signOut(id: string): Promise<void> {
    await this.appJwtService.deleteRefreshToken(id);

    await this.repository
      .updateFcmToken(id, null)
      .catch(createDatabaseErrorHandler);

    return;
  }
}
