/* eslint-env node */

module.exports = {
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },

  extends: ['./index.js'],
};
