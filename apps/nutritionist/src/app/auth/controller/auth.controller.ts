import { BaseApiResponse, IApiResponse, IJwtRefresh } from '@common/common';
import { INutritionist } from '@database/prisma';
import { AccessTokenGuard, RefreshTokenGuard } from '@jwt/app-jwt';
import GetNutritionistLogged from '@jwt/app-jwt/infrastructure/decorator/get-nutritionist-logged.decorator';
import RefreshToken from '@jwt/app-jwt/infrastructure/decorator/refresh-token.decorator';
import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthSuccessMessage } from '../../../common/constant/message/success/auth-success.message';
import { DocsTag } from '../../../common/docs/docs';
import { AuthRefreshTokenRequest } from '../dto/request/auth-refresh-token.request';
import { AuthSignInRequest } from '../dto/request/auth-sign-in.request';
import { AuthSignInResponse } from '../dto/response/auth-sign-in.response';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiTags(DocsTag.AUTH_SIGN_IN)
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

  @ApiTags(DocsTag.AUTH_REFRESH_TOKEN)
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

  @UseGuards(AccessTokenGuard)
  @Delete('sign-out')
  async signOut(
    @GetNutritionistLogged() nutritionist: INutritionist,
  ): Promise<IApiResponse<undefined>> {
    await this.service.signOut(nutritionist.account.id);

    return BaseApiResponse.success({
      message: AuthSuccessMessage.SUCCESS_AUTH_SIGN_OUT,
      data: undefined,
    });
  }
}
