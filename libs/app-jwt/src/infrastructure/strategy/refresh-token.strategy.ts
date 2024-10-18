import { IJwtRefresh, IJwtRefreshPayload } from '@common/common';
import { AppConfigService } from '@config/app-config';
import { AppJwtService } from '@jwt/app-jwt/provider/app-jwt.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private readonly logger = new Logger(RefreshTokenStrategy.name);

  constructor(
    private readonly appConfig: AppConfigService,
    private readonly service: AppJwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwtConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: IJwtRefreshPayload,
  ): Promise<IJwtRefresh> {
    const token = req.headers['x-refresh-token'] as string;

    const isValid = await this.service.validateRefreshToken(payload.sub, token);

    if (!isValid) {
      throw new UnauthorizedException('User not found');
    }

    return {
      token,
      payload,
    };
  }
}
