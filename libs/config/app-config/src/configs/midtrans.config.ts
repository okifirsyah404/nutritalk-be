import { registerAs } from "@nestjs/config";
import { IsDefined, IsEnum, IsString } from "class-validator";

export enum MidtransEnvironment {
	SANDBOX = "sandbox",
	PRODUCTION = "production",
}

/**
 * Represents the configuration for Midtrans settings.
 *
 * @typedef {Object} MidtransConfig
 * @property {string} url - The URL for Midtrans.
 * @property {string} merchantId - The merchant ID for Midtrans.
 * @property {string} clientKey - The client key for Midtrans.
 * @property {string} serverKey - The server key for Midtrans.
 */
export type MidtransConfig = {
	env: MidtransEnvironment;
	url: string;
	snapUrl: string;
	merchantId: string;
	clientKey: string;
	serverKey: string;
};

/**
 * Configuration for Midtrans settings.
 *
 * This configuration is registered under the name 'midtransConfig' and provides
 * the necessary credentials for Midtrans integration.
 *
 * @returns {MidtransConfig} The Midtrans configuration object.
 *
 * Properties:
 * - `url`: The URL for Midtrans.
 * - `merchantId`: The merchant ID for Midtrans.
 * - `clientKey`: The client key for Midtrans.
 * - `serverKey`: The server key for Midtrans.
 */
export const midtransConfig = registerAs(
	"midtransConfig",
	(): MidtransConfig => ({
		env:
			(process.env.MIDTRANS_ENV &&
				MidtransEnvironment[
					process.env.MIDTRANS_ENV.toUpperCase() as keyof typeof MidtransEnvironment
				]) ||
			MidtransEnvironment.SANDBOX,
		url: process.env.MIDTRANS_URL,
		snapUrl: process.env.MIDTRANS_SNAP_URL,
		merchantId: process.env.MIDTRANS_MERCHANT_ID,
		clientKey: process.env.MIDTRANS_CLIENT_KEY,
		serverKey: process.env.MIDTRANS_SERVER_KEY,
	}),
);

/**
 *
 * Class representing the environment variables required for Midtrans configuration.
 *
 */
export class MidtransEnvironmentVariables {
	@IsDefined()
	@IsEnum(MidtransEnvironment)
	MIDTRANS_ENV!: MidtransEnvironment;

	@IsDefined()
	@IsString()
	MIDTRANS_URL: string;

	@IsDefined()
	@IsString()
	MIDTRANS_SNAP_URL: string;

	@IsDefined()
	@IsString()
	MIDTRANS_MERCHANT_ID: string;

	@IsDefined()
	@IsString()
	MIDTRANS_CLIENT_KEY: string;

	@IsDefined()
	@IsString()
	MIDTRANS_SERVER_KEY: string;
}
