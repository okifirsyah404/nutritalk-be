import { registerAs } from "@nestjs/config";
import { IsDefined, IsEnum, IsString, MinLength } from "class-validator";

/**
 * Enum representing different environments for the application.
 *
 * @enum {string}
 * @property {string} Dev - Represents the development environment.
 * @property {string} Staging - Represents the staging environment.
 * @property {string} Prod - Represents the production environment.
 * @property {string} Test - Represents the test environment.
 */
export enum Environment {
	LOCAL = "local",
	DEV = "dev",
	STAGING = "staging",
	PROD = "prod",
	TEST = "test",
}

/**
 * Represents the application configuration.
 *
 * @property {Environment | string | undefined} env - The environment in which the application is running.
 * @property {string} host - The host address of the application.
 */
export type AppConfig = {
	env: Environment;
	host: string;
};

/**
 * Configuration object for the application.
 *
 * This configuration is registered under the name 'appConfig' and provides
 * environment-specific settings for the application.
 *
 * @returns {AppConfig} The application configuration object.
 *
 * Properties:
 * - `env`: The current environment of the application, derived from the `NODE_ENV` environment variable.
 *          Defaults to `Environment.Dev` if `NODE_ENV` is not set or does not match any known environment.
 * - `host`: The host address of the application, derived from the `APP_HOST` environment variable.
 */
export const appConfig = registerAs(
	"appConfig",
	(): AppConfig => ({
		env:
			(process.env.NODE_ENV &&
				Environment[
					process.env.NODE_ENV.toUpperCase() as keyof typeof Environment
				]) ||
			Environment.DEV,
		host: process.env.APP_HOST,
	}),
);

/**
 * Class representing the environment variables for the application.
 */
export class AppEnvironmentVariables {
	@IsDefined()
	@IsEnum(Environment)
	NODE_ENV!: Environment;

	@IsDefined()
	@IsString()
	@MinLength(1)
	APP_HOST!: string;
}
