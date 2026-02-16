module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    node: true,
    es2022: true
  },
  ignorePatterns: [
    'node_modules/',
    'playwright-report/',
    'allure-results/',
    'allure-report/',
    'test-results/'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
};
