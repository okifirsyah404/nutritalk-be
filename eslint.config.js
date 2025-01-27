import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";

export default [
	{
		files: ["**/*.ts", "**/*.tsx"],
		ignores: ["eslint.config.js", "node_modules/*", "dist/*"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
			prettier: prettier,
		},
		rules: {
			// Use recommended rules from the plugin directly
			...tseslint.configs.recommended.rules,
			...eslintConfigPrettier.rules,

			// Custom rules
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/explicit-function-return-type": ["error"],
			"@typescript-eslint/explicit-module-boundary-types": ["warn"],
			"@typescript-eslint/no-unused-vars": ["error"],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-unused-expressions": ["error"],
			"@typescript-eslint/require-await": ["error"],
			"@typescript-eslint/prefer-readonly": ["warn"],
			"@typescript-eslint/no-restricted-types": ["warn"],
			"@typescript-eslint/no-empty-object-type": ["warn"],
			camelcase: "warn",
			"default-case": "error",
			"no-shadow": "warn",
			"no-console": "warn",
			"no-empty-function": ["warn", { allow: ["constructors"] }],
			"no-unused-private-class-members": "warn",
			"no-empty": "error",
			quotes: ["error", "double"],
			"prettier/prettier": [
				"error",
				{
					singleQuote: false,
					trailingComma: "all",
					endOfLine: "crlf",
					useTabs: true,
					tabWidth: 2,
					printWidth: 80,
				},
			],
		},
	},
];
