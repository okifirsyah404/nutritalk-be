import { registerAs } from '@nestjs/config';
import { IsDefined, IsEmail, IsNumberString, IsString } from 'class-validator';

/**
 * Configuration settings for SMTP (Simple Mail Transfer Protocol).
 *
 * @typedef {Object} SmtpConfig
 * @property {string} host - The hostname or IP address of the SMTP server.
 * @property {number} port - The port number on which the SMTP server is listening.
 * @property {string} user - The username for authenticating with the SMTP server.
 * @property {string} password - The password for authenticating with the SMTP server.
 */
export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
};

export const SMTP_CONFIG: SmtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
};

/**
 * Configuration for SMTP (Simple Mail Transfer Protocol) settings.
 *
 * This configuration is registered under the name 'smtpConfig' and provides
 * the necessary details for connecting to an SMTP server.
 *
 * @returns {SmtpConfig} An object containing the SMTP configuration.
 *
 * Properties:
 * - `host` {string} - The hostname of the SMTP server, sourced from `process.env.SMTP_HOST`.
 * - `port` {number} - The port number of the SMTP server, sourced from `process.env.SMTP_PORT`.
 * - `user` {string} - The username for SMTP authentication, sourced from `process.env.SMTP_USER`.
 * - `password` {string} - The password for SMTP authentication, sourced from `process.env.SMTP_PASSWORD`.
 */
export const smtpConfig = registerAs(
  'smtpConfig',
  (): SmtpConfig => ({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  }),
);

/**
 * Class representing the environment variables required for SMTP configuration.
 *
 * @class SmtpEnvironmentVariables
 *
 * @property {string} SMTP_HOST - The host address of the SMTP server.
 * @property {string} SMTP_PORT - The port number of the SMTP server.
 * @property {string} SMTP_USER - The username for the SMTP server, which must be a valid email address.
 * @property {string} SMTP_PASSWORD - The password for the SMTP server.
 *
 */
export class SmtpEnvironmentVariables {
  @IsDefined()
  @IsString()
  SMTP_HOST!: string;

  @IsDefined()
  @IsNumberString()
  SMTP_PORT!: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  SMTP_USER!: string;

  @IsDefined()
  @IsString()
  SMTP_PASSWORD!: string;
}
