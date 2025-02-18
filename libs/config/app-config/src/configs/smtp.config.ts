import { registerAs } from "@nestjs/config";
import {
	IsBooleanString,
	IsDefined,
	IsEmail,
	IsNumberString,
	IsString,
} from "class-validator";

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
	secure: boolean;
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
	"smtpConfig",
	(): SmtpConfig => ({
		host: process.env.SMTP_HOST,
		port: parseInt(process.env.SMTP_PORT),
		user: process.env.SMTP_USER,
		password: process.env.SMTP_PASSWORD,
		secure: process.env.SMTP_SECURE === "true",
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
	@IsDefined({
		message: "SMTP_HOST is required.",
	})
	@IsString({
		message: "SMTP_HOST must be a string.",
	})
	SMTP_HOST!: string;

	@IsDefined({
		message: "SMTP_PORT is required.",
	})
	@IsNumberString({}, { message: "SMTP_PORT must be a number." })
	SMTP_PORT!: string;

	@IsDefined({
		message: "SMTP_USER is required.",
	})
	@IsString({
		message: "SMTP_USER must be a string.",
	})
	@IsEmail({}, { message: "SMTP_USER must be a valid email address." })
	SMTP_USER!: string;

	@IsDefined({
		message: "SMTP_PASSWORD is required.",
	})
	@IsString({
		message: "SMTP_PASSWORD must be a string.",
	})
	SMTP_PASSWORD!: string;

	@IsDefined({
		message: "SMTP_SECURE is required.",
	})
	@IsBooleanString({
		message: "SMTP_SECURE must be a boolean value.",
	})
	SMTP_SECURE!: string;
}
