module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended' // <- Integración con Prettier
  ],
  parserOptions: { ecmaVersion: 2021, parser: '@typescript-eslint/parser', sourceType: 'module' },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/html-self-closing': 'warn',
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/html-indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
