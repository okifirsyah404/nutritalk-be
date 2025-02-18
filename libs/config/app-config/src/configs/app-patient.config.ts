import { registerAs } from "@nestjs/config";
import { Type } from "class-transformer";
import { IsDefined, IsNumber, MinLength } from "class-validator";

/**
 * Configuration settings for the Patient application.
 *
 * @typedef {Object} AppPatientConfig
 * @property {number} port - The port number on which the application will run.
 */
export type AppPatientConfig = {
	port: number;
	version: string;
	url: string;
};

/**
 * Configuration for the Patient application.
 *
 * This configuration is registered under the name 'appPatientConfig'.
 * It retrieves the port number from the environment variable `APP_PATIENT_PORT`.
 *
 * @returns {AppPatientConfig} The configuration object for the Patient application.
 *
 * Properties:
 * - `port`: The port number on which the application will run.
 */
export const appPatientConfig = registerAs(
	"appPatientConfig",
	(): AppPatientConfig => ({
		port: parseInt(process.env.APP_PATIENT_PORT),
		version: process.env.APP_PATIENT_VERSION,
		url: process.env.APP_PATIENT_URL,
	}),
);

/**
 *
 * Class representing the environment variables for the Patient application.
 *
 */
export class AppPatientEnvironmentVariables {
	@Type(() => Number)
	@IsDefined()
	@IsNumber()
	APP_PATIENT_PORT: number;

	@IsDefined()
	@MinLength(1)
	APP_PATIENT_VERSION: string;

	@IsDefined()
	@MinLength(1)
	APP_PATIENT_URL: string;
}
