import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, MinLength } from 'class-validator';

/**
 * Configuration settings for the Nutritionist application.
 *
 * @typedef {Object} AppNutritionistConfig
 * @property {number} port - The port number on which the application will run.
 */
export type AppNutritionistConfig = {
  port: number;
  version: string;
  url: string;
};

/**
 * Configuration for the Nutritionist application.
 *
 * This configuration is registered under the name 'appNutritionistConfig'.
 * It retrieves the port number from the environment variable `APP_NUTRITIONIST_PORT`.
 *
 * @returns {AppNutritionistConfig} The configuration object for the Nutritionist application.
 *
 * Properties:
 * - `port`: The port number on which the application will run.
 */
export const appNutritionistConfig = registerAs(
  'appNutritionistConfig',
  (): AppNutritionistConfig => ({
    port: parseInt(process.env.APP_NUTRITIONIST_PORT!),
    version: process.env.APP_NUTRITIONIST_VERSION,
    url: process.env.APP_NUTRITIONIST_URL,
  }),
);

/**
 *
 * Class representing the environment variables for the Nutritionist application.
 *
 */
export class AppNutritionistEnvironmentVariables {
  @Type(() => Number)
  @IsDefined()
  @IsNumber()
  APP_NUTRITIONIST_PORT: number;

  @IsDefined()
  @MinLength(1)
  APP_NUTRITIONIST_VERSION: string;

  @IsDefined()
  @MinLength(1)
  APP_NUTRITIONIST_URL: string;
}
