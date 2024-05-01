/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  extends: ['plugin:testing-library/react'],
  parserOptions: {
    project: './tsconfig.json',
  },
}

module.exports = config
