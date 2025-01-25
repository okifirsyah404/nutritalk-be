import { registerAs } from "@nestjs/config";
import { IsDefined, IsNumberString, MinLength } from "class-validator";

/**
 * Configuration settings for the App Admin module.
 *
 * @typedef {Object} AppAdminConfig
 * @property {number} port - The port number on which the admin module will run.
 */
export type AppAdminConfig = {
	port: number;
	version: string;
	url: string;
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
	"appAdminConfig",
	(): AppAdminConfig => ({
		port: parseInt(process.env.APP_ADMIN_PORT),
		version: process.env.APP_ADMIN_VERSION,
		url: process.env.APP_ADMIN_URL,
	}),
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

	@IsDefined()
	@MinLength(1)
	APP_ADMIN_VERSION: string;

	@IsDefined()
	@MinLength(1)
	APP_ADMIN_URL: string;
}
