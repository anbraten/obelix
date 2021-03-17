/* eslint-env node */
module.exports = {
  overrides: [
    {
      files: ['**/*.test.(t|j)s', '**/*.spec.(t|j)s'],
      env: {
        jest: true, // now **/*.test.js files' env has both es6 *and* jest
      },
      extends: ['plugin:jest/all'],
    },
  ],
};
