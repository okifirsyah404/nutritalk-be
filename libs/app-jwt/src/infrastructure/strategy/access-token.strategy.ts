import { IJwtAccessPayload } from '@common/common';
import { AppConfigService } from '@config/app-config';
import { INutritionist, IPatient } from '@database/prisma';
import { AppJwtService } from '@jwt/app-jwt/provider/app-jwt.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
/**
 * Strategy for validating access tokens using Passport.
 */
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: AppConfigService,
    private readonly service: AppJwtService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtConfig.accessTokenSecret,
    });
  }

  /**
   * Validates the payload of the access token.
   * @param payload - The payload of the access token.
   * @returns The validated payload.
   */
  async validate(
    payload: IJwtAccessPayload,
  ): Promise<INutritionist | IPatient> {
    let user = await this.cacheService.get<INutritionist | IPatient>(
      `accessToken:${payload.sub}`,
    );

    if (!user) {
      switch (payload.role) {
        case Role.NUTRITIONIST:
          user = await this._validateNutritionist(payload.sub);
          break;
        case Role.PATIENT:
          user = await this._validatePatient(payload.sub);
          break;
        default:
          throw new UnauthorizedException('User not found');
      }

      await this.cacheService.set(
        `accessToken:${payload.sub}`,
        user,
        this.config.redisConfig.ttl,
      );
    }

    return user;
  }

  private async _validateNutritionist(id: string): Promise<INutritionist> {
    const nutritionist = await this.service.getNutritionistById(id);

    if (!nutritionist) {
      throw new UnauthorizedException('Nutritionist not found');
    }
    return nutritionist;
  }

  private async _validatePatient(id: string): Promise<IPatient> {
    const patient = await this.service.getPatientById(id);

    if (!patient) {
      throw new UnauthorizedException('Patient not found');
    }

    return patient;
  }
}
