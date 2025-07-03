import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig, // Add prettier config
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier, // Add prettier plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Additional rules for stricter linting
      'no-unused-vars': 'warn', // Warn about unused variables
      'prefer-const': 'warn', // Suggest const for variables that are never reassigned
      'react/jsx-uses-react': 'off', // Not needed with new JSX transform
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused TypeScript variables, ignore those starting with _
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow inferring types for module boundaries
      '@typescript-eslint/no-explicit-any': 'warn', // Warn about using 'any' type
      '@typescript-eslint/no-non-null-assertion': 'warn', // Warn about non-null assertions
      '@typescript-eslint/consistent-type-imports': 'warn', // Enforce consistent usage of type imports
      '@typescript-eslint/no-empty-interface': 'off', // Allow empty interfaces
      'prettier/prettier': 'error', // Enable prettier rule
    },
  }
);
