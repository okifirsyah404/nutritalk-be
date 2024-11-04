import { BaseApiResponse } from '@common/response/base-api.response';
import { IApiResponse } from '@contract/response/api-response.interface';
import { INutritionistEntity } from '@database/prisma';
import { AccessTokenGuard, IJwtRefresh, RefreshTokenGuard } from '@jwt/app-jwt';
import GetNutritionistLogged from '@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator';
import RefreshToken from '@jwt/app-jwt/infrastructure/decorator/refresh-token.decorator';
import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthSuccessMessage } from '../../../common/constant/message/success/auth-success.message';
import { DocsTag } from '../../../common/docs/docs';
import {
  AuthRefreshTokenDecorators,
  AuthSignInDecorators,
  AuthSignOutDecorators,
} from '../decorator/auth.decorators';
import { AuthRefreshTokenRequest } from '../dto/request/auth-refresh-token.request';
import { AuthSignInRequest } from '../dto/request/auth-sign-in.request';
import { AuthSignInResponse } from '../dto/response/auth-sign-in.response';
import { AuthService } from '../service/auth.service';

@ApiTags(DocsTag.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   *
   * Http endpoint for signing up a user.
   *
   * Request body:
   * - email: (required) string
   * - password: (required) string
   *
   * Response:
   * - status: string
   * - statusCode: number
   * - message: string
   * - data: object of accessToken and refreshToken
   *
   */
  @AuthSignInDecorators()
  @Post('sign-in')
  async signIn(
    @Body() reqBody: AuthSignInRequest,
  ): Promise<IApiResponse<AuthSignInResponse>> {
    const result = await this.service.signIn(reqBody);

    return BaseApiResponse.created({
      message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_IN,
      data: AuthSignInResponse.fromEntity(result),
    });
  }

  /**
   *
   * Http endpoint for refreshing the access token.
   *
   * Request header:
   * - x-refresh-token: (required) string
   *
   * Response:
   * - status: string
   * - statusCode: number
   * - message: string
   * - data: object of accessToken and refreshToken
   *
   */
  @AuthRefreshTokenDecorators()
  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  async getRefreshToken(
    @RefreshToken() refreshToken: IJwtRefresh,
    @Body() reqBody: AuthRefreshTokenRequest,
  ): Promise<IApiResponse<AuthSignInResponse>> {
    const result = await this.service.refreshToken(refreshToken, reqBody);

    return BaseApiResponse.success({
      message: AuthSuccessMessage.SUCCESS_AUTH_REFRESH_TOKEN,
      data: AuthSignInResponse.fromEntity(result),
    });
  }

  /**
   *
   * Http endpoint for signing out a user.
   *
   * Response:
   * - status: string
   * - statusCode: number
   * - message: string
   * - data: undefined
   *
   */
  @AuthSignOutDecorators()
  @UseGuards(AccessTokenGuard)
  @Delete('sign-out')
  async signOut(
    @GetNutritionistLogged() nutritionist: INutritionistEntity,
  ): Promise<IApiResponse<undefined>> {
    await this.service.signOut(nutritionist.account.id);

    return BaseApiResponse.success({
      message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_OUT,
      data: undefined,
    });
  }
}
