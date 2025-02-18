import { registerAs } from "@nestjs/config";
import { Type } from "class-transformer";
import { IsDefined, IsNumber, IsNumberString, IsString } from "class-validator";

/**
 * Represents the configuration settings for a Redis instance.
 *
 * @typedef {Object} RedisConfig
 *
 * @property {string} host - The hostname of the Redis server.
 * @property {number} port - The port number on which the Redis server is running.
 * @property {string} url - The URL of the Redis server.
 * @property {number} ttl - The time-to-live (TTL) value for Redis keys.
 */
export type RedisConfig = {
	host: string;
	port: number;
	database: number;
	url: string;
	ttl: number;
};

/**
 * Configuration for Redis.
 *
 * This configuration is registered under the name 'redisConfig' and provides
 * the necessary settings for connecting to a Redis instance.
 *
 * @returns {RedisConfig} The Redis configuration object.
 *
 * Properties:
 * - `host` (string): The hostname of the Redis server, sourced from the environment variable `REDIS_HOST`.
 * - `port` (number): The port number on which the Redis server is running, sourced from the environment variable `REDIS_PORT`.
 * - `url` (string): The URL of the Redis server, sourced from the environment variable `REDIS_URL`.
 * - `ttl` (number): The time-to-live (TTL) value for Redis keys, sourced from the environment variable `REDIS_TTL`.
 */
export const redisConfig = registerAs(
	"redisConfig",
	(): RedisConfig => ({
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT),
		database: parseInt(process.env.REDIS_DB),
		url: process.env.REDIS_URL,
		ttl: parseInt(process.env.REDIS_TTL),
	}),
);

/**
 * Class representing the environment variables required for Redis configuration.
 *
 * @class RedisEnvironmentVariables
 *
 * @property {string} REDIS_HOST - The host address of the Redis server.
 * @property {string} REDIS_PORT - The port number on which the Redis server is running.
 * @property {string} REDIS_URL - The URL of the Redis server.
 * @property {string} REDIS_TTL - The time-to-live (TTL) value for Redis keys.
 */
export class RedisEnvironmentVariables {
	@IsDefined()
	@IsString()
	REDIS_HOST!: string;

	@IsDefined()
	@IsNumberString()
	REDIS_PORT!: string;

	@Type(() => Number)
	@IsDefined()
	@IsNumber()
	REDIS_DB!: number;

	@IsDefined()
	@IsString()
	REDIS_URL!: string;

	@IsDefined()
	@IsNumberString()
	REDIS_TTL!: string;
}
