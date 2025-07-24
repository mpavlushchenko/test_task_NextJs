import { defineFlatConfig } from 'eslint-define-config';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default defineFlatConfig([
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.css', '**/*.scss'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
