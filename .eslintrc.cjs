/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:import/typescript'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always'
        }
      }
    ],
    'vue/attribute-hyphenation': [
      2,
      'never',
      {
        ignore: []
      }
    ],
    'vue/custom-event-name-casing': [
      2,
      'camelCase',
      {
        ignores: []
      }
    ],
    'vue/v-on-event-hyphenation': [
      'error',
      'never',
      {
        autofix: true,
        ignore: []
      }
    ],
    'vue/prop-name-casing': [2, 'camelCase'],
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/no-mutating-props': 1,
    'vue/multi-word-component-names': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 100
      },
      {
        usePrettierrc: true
      }
    ]
  },
  overrides: [
    // **.ts
    {
      files: ['*.ts'],
      extends: ['plugin:import/typescript'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error'
      }
    }
  ],
  ignorePatterns: ['postcss.config.js']
}
