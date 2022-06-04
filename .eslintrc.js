module.exports = {
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'next',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-extraneous-dependencies': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'import/extensions': ['off'],
    'react/function-component-definition': [1, {
      namedComponents: ['function-declaration', 'function-expression', 'arrow-function'],
      unnamedComponents: ['function-expression', 'arrow-function'],
    }],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-no-useless-fragment': ['off'],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
  },
};
