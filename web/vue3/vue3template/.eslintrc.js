module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/essential', // vue2
    'standard',
    'plugin:vue/vue3-recommended' // vue3
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { modules: true },
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  plugins: ['vue'],
  rules: {
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
    // 'consistent-return': 'off',
    // 'func-names': 'off',
    'function-paren-newline': ['error', 'multiline-arguments'],
    'import/extensions': ['error', 'never'],
    'max-len': ['error', 140],
    'no-else-return': 'error',
    // 'no-bitwise': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-mixed-operators': 'off',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    // 'no-nested-ternary': 'off',
    // 'no-param-reassign': 'off',
    // 'no-plusplus': 'off',
    'no-useless-call': 'off',
    // 'no-underscore-dangle': 'off',
    // 'no-unused-expressions': 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true },
      ObjectPattern: { multiline: true },
      ImportDeclaration: { multiline: true, minProperties: 3 },
      ExportDeclaration: { multiline: true, minProperties: 3 }
    }],
    'object-shorthand': ['error', 'always'],
    'prefer-template': 'error',
    semi: ['error', 'always'],

    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 1,
      alignAttributesVertically: true,
      ignores: []
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'never',
        component: 'never'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/no-multiple-template-root': 'off',
    'vue/no-unused-components': ['error', { ignoreWhenBindingPresent: true }],
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 4 },
      multiline: { max: 1 }
    }],
    'vue/require-default-prop': 'off'
  }
};
