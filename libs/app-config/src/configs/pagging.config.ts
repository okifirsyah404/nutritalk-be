import { registerAs } from "@nestjs/config";
import { IsDefined, IsNumberString } from "class-validator";

/**
 * Configuration settings for pagination.
 *
 * @typedef {Object} PaggingConfig
 * @property {number} maxPageSize - The maximum number of items per page.
 * @property {number} defaultPageSize - The default number of items per page.
 */
export type PaggingConfig = {
	maxPageSize: number;
	defaultPageSize: number;
};

/**
 * Configuration for pagination settings.
 *
 * This configuration is registered under the name 'paggingConfig' and provides
 * the maximum and default page sizes for pagination. The values are retrieved
 * from environment variables.
 *
 * @returns {PaggingConfig} The pagination configuration object.
 *
 * Properties:
 * - `maxPageSize` (number): The maximum number of items per page, sourced from the environment variable `APP_PAGINATION_MAX_PAGE_SIZE`.
 * - `defaultPageSize` (number): The default number of items per page, sourced from the environment variable `APP_PAGINATION_DEFAULT_PAGE_SIZE`.
 */
export const paggingConfig = registerAs(
	"paggingConfig",
	(): PaggingConfig => ({
		maxPageSize: parseInt(process.env.APP_PAGINATION_MAX_PAGE_SIZE),
		defaultPageSize: parseInt(process.env.APP_PAGINATION_DEFAULT_PAGE_SIZE),
	}),
);

/**
 * Class representing the pagination environment variables.
 *
 * This class is used to define and validate the environment variables
 * related to pagination settings in the application.
 *
 * @class PaggingEnvironmentVariables
 *
 * @property {string} APP_PAGINATION_MAX_PAGE_SIZE - The maximum page size for pagination.
 * @property {string} APP_PAGINATION_DEFAULT_PAGE_SIZE - The default page size for pagination.
 */
export class PaggingEnvironmentVariables {
	@IsDefined()
	@IsNumberString()
	APP_PAGINATION_MAX_PAGE_SIZE!: string;

	@IsDefined()
	@IsNumberString()
	APP_PAGINATION_DEFAULT_PAGE_SIZE!: string;
}
