import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ),
  {
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      project: ['./tsconfig.json'],
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(__dirname, './tsconfig.json'),
        },
      },
    },
  },
];
