import { registerAs } from '@nestjs/config';
import { IsDefined, IsNumberString, MinLength } from 'class-validator';

/**
 * Configuration settings for the Nutritionist application.
 *
 * @typedef {Object} AppNutritionistConfig
 * @property {number} port - The port number on which the application will run.
 */
export type AppNutritionistConfig = {
  port: number;
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
  }),
);

/**
 *
 * Class representing the environment variables for the Nutritionist application.
 *
 */
export class AppNutritionistEnvironmentVariables {
  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  APP_NUTRITIONIST_PORT!: string;
}
