// .eslintrc.cjs
module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true, // ← Jest 전역(describe/test/expect/jest) 인식
  },
  extends: [
    'airbnb',
    'plugin:jest/recommended', // ← 추가
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-unused-vars': 'warn',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/__tests__/**/*.js'],
      env: { jest: true },
    },
  ],
};
