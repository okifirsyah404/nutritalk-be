import { registerAs } from '@nestjs/config';

/**
 * Configuration settings for handling multipart form data.
 *
 * @typedef {Object} MultipartConfig
 * @property {number} fieldMaxCount - The maximum number of fields allowed in the form.
 * @property {number} fieldMaxSize - The maximum size (in bytes) allowed for each field.
 * @property {number} fileMaxCount - The maximum number of files allowed in the form.
 * @property {number} fileMaxSize - The maximum size (in bytes) allowed for each file.
 */
export type MultipartConfig = {
  fieldMaxCount: number;
  fieldMaxSize: number;
  fileMaxCount: number;
  fileMaxSize: number;
};

/**
 * Configuration for multipart handling.
 *
 * This configuration is registered under the name 'multipartConfig' and provides
 * settings for handling multipart form data, such as the maximum number of fields,
 * maximum size of fields, maximum number of files, and maximum size of files.
 *
 * @returns {MultipartConfig} The multipart configuration object.
 *
 * Properties:
 * - `fieldMaxCount` (number): The maximum number of fields allowed in the form, sourced from the environment variable `MULTIPART_FIELD_MAX_COUNT`.
 * - `fieldMaxSize` (number): The maximum size (in bytes) allowed for each field, sourced from the environment variable `MULTIPART_FIELD_MAX_SIZE`.
 * - `fileMaxCount` (number): The maximum number of files allowed in the form, sourced from the environment variable `MULTIPART_FILE_MAX_COUNT`.
 * - `fileMaxSize` (number): The maximum size (in bytes) allowed for each file, sourced from the environment variable `MULTIPART_FILE_MAX_SIZE`.
 */
export const multipartConfig = registerAs(
  'multipartConfig',
  (): MultipartConfig => ({
    fieldMaxCount: parseInt(process.env.MULTIPART_FIELD_MAX_COUNT),
    fieldMaxSize: parseInt(process.env.MULTIPART_FIELD_MAX_SIZE),
    fileMaxCount: parseInt(process.env.MULTIPART_FILE_MAX_COUNT),
    fileMaxSize: parseInt(process.env.MULTIPART_FILE_MAX_SIZE),
  }),
);

/**
 * Class representing the environment variables for multipart configuration.
 *
 * This class uses decorators to enforce validation rules on the environment variables.
 *
 * @class
 */
export class MultipartEnvironmentVariables {
  /**
   * Maximum count of multipart fields.
   *
   * @type {string}
   * @decorator `@IsDefined()`
   * @decorator `@IsNumberString()`
   */
  MULTIPART_FIELD_MAX_COUNT!: string;

  /**
   * Maximum size of a multipart field.
   *
   * @type {string}
   * @decorator `@IsDefined()`
   * @decorator `@IsNumberString()`
   */
  MULTIPART_FIELD_MAX_SIZE!: string;

  /**
   * Maximum count of multipart files.
   *
   * @type {string}
   * @decorator `@IsDefined()`
   * @decorator `@IsNumberString()`
   */
  MULTIPART_FILE_MAX_COUNT!: string;

  /**
   * Maximum size of a multipart file.
   *
   * @type {string}
   * @decorator `@IsDefined()`
   * @decorator `@IsNumberString()`
   */
  MULTIPART_FILE_MAX_SIZE!: string;
}
