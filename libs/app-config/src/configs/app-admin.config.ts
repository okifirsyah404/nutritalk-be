import { registerAs } from '@nestjs/config';
import { IsDefined, IsNumberString, MinLength } from 'class-validator';

/**
 * Configuration settings for the App Admin module.
 *
 * @typedef {Object} AppAdminConfig
 * @property {number} port - The port number on which the admin module will run.
 */
export type AppAdminConfig = {
  port: number;
};

export const APP_ADMIN_CONFIG: AppAdminConfig = {
  port: parseInt(process.env.APP_ADMIN_PORT!),
};

/**
 * Configuration for the admin application.
 *
 * This configuration is registered under the name 'appAdminConfig' and includes
 * settings specific to the admin application.
 *
 * @returns {AppAdminConfig} The configuration object for the admin application.
 *
 * properties:
 * - `port`: The port number on which the admin module will run.
 */
export const appAdminConfig = registerAs(
  'appAdminConfig',
  (): AppAdminConfig => APP_ADMIN_CONFIG,
);

/**
 *
 * Represents the environment variables required for the App Admin configuration.
 *
 */
export class AppAdminEnvironmentVariables {
  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  APP_ADMIN_PORT!: string;
}
