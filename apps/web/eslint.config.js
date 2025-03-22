import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import tsEsLint from "typescript-eslint";

export default [
	{
		files: ["**/*.svelte"],
		ignores: ["**/.svelte-kit/**"],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsEsLint.parser
			}
		},
		plugins: {
			svelte,
			"@typescript-eslint": tsEsLint.plugin
		},
		rules: {
			...svelte.configs.recommended.rules,
			...tsEsLint.configs.recommended.find((c) => c.name === "typescript-eslint/recommended").rules,
			"svelte/no-at-html-tags": "warn",
			"svelte/valid-compile": [
				"error",
				{
					// ignore non-fatal warnings reported by svelte compiler i.e. Unused css selector
					// https://sveltejs.github.io/eslint-plugin-svelte/rules/valid-compile/
					ignoreWarnings: true
				}
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-unused-expressions": "warn"
		}
	}
];
