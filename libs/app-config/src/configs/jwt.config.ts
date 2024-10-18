import { registerAs } from '@nestjs/config';
import { IsDefined, IsString } from 'class-validator';

/**
 * Represents the configuration for JWT settings.
 *
 * @typedef {Object} JwtConfig
 * @property {string} accessTokenSecret - The secret key for access tokens.
 * @property {string} accessTokenExpiresIn - The expiration time for access tokens.
 * @property {string} refreshTokenSecret - The secret key for refresh tokens.
 * @property {string} refreshTokenExpiresIn - The expiration time for refresh tokens.
 * @property {string} signatureTokenSecret - The secret key for signature tokens.
 * @property {string} signatureTokenExpiresIn - The expiration time for signature tokens.
 */
export type JwtConfig = {
  accessTokenSecret?: string;
  accessTokenExpiresIn?: string;
  refreshTokenSecret?: string;
  refreshTokenExpiresIn?: string;
  signatureTokenSecret?: string;
  signatureTokenExpiresIn?: string;
};

/**
 * Configuration for JWT (JSON Web Token) settings.
 *
 * This configuration is registered under the name 'jwtConfig' and provides
 * the necessary secrets and expiration times for access tokens, refresh tokens,
 * and signature tokens.
 *
 * @returns {JwtConfig} The JWT configuration object.
 *
 * Properties:
 * - `accessTokenSecret`: The secret key for access tokens.
 * - `accessTokenExpiresIn`: The expiration time for access tokens.
 * - `refreshTokenSecret`: The secret key for refresh tokens.
 * - `refreshTokenExpiresIn`: The expiration time for refresh tokens.
 * - `signatureTokenSecret`: The secret key for signature tokens.
 * - `signatureTokenExpiresIn`: The expiration time for signature tokens.
 */
export const jwtConfig = registerAs(
  'jwtConfig',
  (): JwtConfig => ({
    accessTokenSecret: process.env.JWT_SECRET,
    accessTokenExpiresIn: process.env.JWT_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    signatureTokenSecret: process.env.JWT_SIGNATURE_SECRET,
    signatureTokenExpiresIn: process.env.JWT_SIGNATURE_EXPIRES_IN,
  }),
);

/**
 *
 * Class representing the environment variables required for JWT configuration.
 *
 */
export class JwtEnvironmentVariables {
  @IsDefined()
  @IsString()
  JWT_SECRET!: string;

  @IsDefined()
  @IsString()
  JWT_EXPIRES_IN!: string;

  @IsDefined()
  @IsString()
  JWT_REFRESH_SECRET!: string;

  @IsDefined()
  @IsString()
  JWT_REFRESH_EXPIRES_IN!: string;

  @IsDefined()
  @IsString()
  JWT_SIGNATURE_SECRET!: string;

  @IsDefined()
  @IsString()
  JWT_SIGNATURE_EXPIRES_IN!: string;
}
