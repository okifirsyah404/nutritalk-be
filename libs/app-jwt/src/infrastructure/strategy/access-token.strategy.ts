import { AppConfigService } from '@config/app-config';
import { INutritionist, IPatient } from '@database/prisma';
import { IJwtAccessPayload } from '@jwt/app-jwt';
import { AppJwtService } from '@jwt/app-jwt/provider/app-jwt.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
/**
 * Strategy for validating access tokens using Passport.
 */
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: AppConfigService,
    private readonly service: AppJwtService,
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
    let user: INutritionist | IPatient;

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
