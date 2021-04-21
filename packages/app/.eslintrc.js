/* eslint-env node */

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },

  extends: ['@obelix/eslint-config/vue'],
};
