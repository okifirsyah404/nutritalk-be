import { registerAs } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const packageJson = require(join(process.cwd(), 'package.json'));

/**
 * Represents the configuration for documentation.
 *
 * @typedef {Object} DocsConfig
 * @property {string} endpoint - The endpoint URL for the documentation.
 * @property {string} title - The title of the documentation.
 * @property {string} description - A brief description of the documentation.
 * @property {string} version - The version of the documentation.
 * @property {Object} [contact] - Optional contact information.
 * @property {string} [contact.name] - The name of the contact person.
 * @property {string} [contact.url] - The URL for the contact person.
 * @property {string} [contact.email] - The email address of the contact person.
 * @property {Object} [license] - Optional license information.
 * @property {string} [license.name] - The name of the license.
 * @property {string} [license.url] - The URL for the license.
 * @property {string[]} [customCss] - Optional array of custom CSS file paths.
 */
export type DocsConfig = {
  endpoint: string;
  title: string;
  description: string;
  version: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name?: string;
    url?: string;
  };
  customCss?: string[];
};

/**
 * Configuration object for documentation settings.
 *
 * @remarks
 * This configuration is registered under the name 'docsConfig' and includes
 * settings for the documentation endpoint, title, description, version, and
 * custom CSS URLs.
 *
 * @returns {DocsConfig} The documentation configuration object.
 *
 * Properties:
 * - `endpoint`: The endpoint URL for the documentation.
 * - `title`: The title of the documentation.
 * - `description`: A brief description of the documentation.
 * - `version`: The version of the documentation.
 * - `customCss`: An array of custom CSS file paths.
 */
export const docsConfig = registerAs(
  'docsConfig',
  (): DocsConfig => ({
    endpoint: 'docs',
    title: '',
    description: '',
    version: '',
    customCss: process.env.DOCS_CUSTOM_CSS_URL?.split(',') || [],
  }),
);
