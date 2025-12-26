import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 'warn'
    }
  },
  {
    plugins: { 'simple-import-sort': pluginSimpleImportSort },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^next$', '^react$', '^@?\\w'], // React, Module
            ['^@(/.*|$)'], // Global Import
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent Import
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Sibling Import
            ['.*\\.tsx$'], // component
            ['^(@|components)(/.*|$)'], // component
            ['^.+\\.?(css)$'], // Style
            ['^\\u0000']
          ]
        }
      ],
      'simple-import-sort/exports': 'error' // exports
    }
  },
  {
    plugins: { import: pluginImport },
    rules: {
      'import/no-duplicates': 'error', // Merge the same import
      'import/first': 'error', // Make sure all imports are at the top of the file
      'import/newline-after-import': 'error' // Make sure have a newline after importing
    }
  }
]);

export default eslintConfig;
