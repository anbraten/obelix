/* eslint-env node */

module.exports = {
  env: {
    browser: true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
    // tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
  },

  extends: [
    './index.js',
    './jest.js',

    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:vue-scoped-css/recommended',
  ],

  rules: {
    'vue/attribute-hyphenation': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
        },
      },
    ],
    'vue/no-static-inline-styles': 'error',
    'vue/v-on-function-call': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-concat': 'error',
    'vue/no-boolean-default': 'error',
    'vue/html-button-has-type': 'error',
    'vue/component-name-in-template-casing': 'error',
    // 'vue/match-component-file-name': [
    //   'error',
    //   {
    //     extensions: ['vue'],
    //     shouldMatchCase: true,
    //   },
    // ],
    'vue/require-name-property': 'error',
    'vue/v-for-delimiter-style': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-unused-properties': [
      'error',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
      },
    ],
    'vue/new-line-between-multi-line-property': 'error',
    'vue/padding-line-between-blocks': 'error',

    // css rules
    'vue-scoped-css/no-unused-selector': 'error',
    'vue-scoped-css/no-parsing-error': 'error',
    'vue-scoped-css/require-scoped': 'error',

    // set this again because some extended config disabled it
    'prettier/prettier': 'error',
    curly: 'error',
  },
};
