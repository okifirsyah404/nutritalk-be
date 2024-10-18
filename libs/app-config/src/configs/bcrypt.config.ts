import { registerAs } from '@nestjs/config';
import { IsDefined, IsNumberString, MinLength } from 'class-validator';

/**
 * Configuration settings for bcrypt hashing.
 *
 * @typedef {Object} BcryptConfig
 * @property {number} saltRounds - The number of salt rounds to use for hashing.
 */
export type BcryptConfig = {
  saltRounds: number;
};

/**
 * Configuration for bcrypt hashing algorithm.
 *
 * This configuration is registered under the name 'bcryptConfig' and provides
 * the number of salt rounds to be used for hashing passwords.
 *
 * @returns {BcryptConfig} An object containing the salt rounds for bcrypt.
 *
 * Properties:
 * - `saltRounds` {number} - The number of salt rounds to use for hashing passwords.
 */
export const bcryptConfig = registerAs(
  'bcryptConfig',
  (): BcryptConfig => ({
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  }),
);

/**
 * Class representing the environment variables required for bcrypt configuration.
 */
export class BcryptEnvironmentVariables {
  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  BCRYPT_SALT_ROUNDS!: string;
}
