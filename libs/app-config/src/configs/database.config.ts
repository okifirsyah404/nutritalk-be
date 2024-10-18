import { registerAs } from '@nestjs/config';
import {
  IsDefined,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Represents the configuration settings for a database connection.
 *
 * @typedef {Object} DatabaseConfig
 * @property {string} provider - The database provider (e.g., PostgreSQL, MySQL).
 * @property {string} host - The hostname or IP address of the database server.
 * @property {number} port - The port number on which the database server is listening.
 * @property {string} name - The name of the database.
 * @property {string} user - The username for authenticating with the database.
 * @property {string} password - The password for authenticating with the database.
 * @property {string} url - The full connection URL for the database.
 * @property {string} [shadowUrl] - An optional shadow database URL, typically used for testing or migrations.
 */
export type DatabaseConfig = {
  provider: string;
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  url: string;
  shadowUrl?: string;
};

/**
 * Configuration object for the database.
 *
 * This configuration is registered under the name 'databaseConfig' and provides
 * various database connection parameters sourced from environment variables.
 *
 * @returns {DatabaseConfig} The database configuration object.
 *
 * @property {string} provider - The database provider (e.g., 'postgres', 'mysql').
 * @property {string} host - The database host address.
 * @property {number} port - The port number on which the database is running.
 * @property {string} name - The name of the database.
 * @property {string} user - The username for database authentication.
 * @property {string} password - The password for database authentication.
 * @property {string} url - The full database connection URL.
 * @property {string | undefined} shadowUrl - The shadow database connection URL, if any.
 */
export const databaseConfig = registerAs(
  'databaseConfig',
  (): DatabaseConfig => ({
    provider: process.env.DB_PROVIDER!,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    name: process.env.DB_NAME!,
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    url: process.env.DATABASE_URL!,
    shadowUrl: process.env.SHADOW_DATABASE_URL,
  }),
);

/**
 * Class representing the environment variables required for database configuration.
 */
export class DatabaseEnvironmentVariables {
  @IsDefined()
  @IsString()
  DB_PROVIDER!: string;

  @IsDefined()
  @IsString()
  DB_HOST!: string;

  @IsDefined()
  @IsNumberString()
  DB_PORT!: string;

  @IsDefined()
  @IsString()
  DB_NAME!: string;

  @IsDefined()
  @IsString()
  DB_USERNAME!: string;

  @IsDefined()
  @IsString()
  DB_PASSWORD!: string;

  @IsDefined()
  @IsString()
  DATABASE_URL!: string;

  @IsOptional()
  @IsString()
  SHADOW_DATABASE_URL?: string;
}
