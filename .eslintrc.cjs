module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'import'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['**/*.scss', '*.scss'],
  rules: {
    semi: [1, 'never'],
    'no-debugger': 'off',
    quotes: [1, 'single'],
    'no-unused-vars': 0,
    'no-undef': 0,
    'react/prop-types': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    indent: ['off', 'tab'],
    complexity: ['error', { max: 10 }],
    'max-lines': ['error', { max: 350, skipBlankLines: true, skipComments: true }],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react$', '^react-dom$'],
          ['^@?\\w'],
          ['^\\u0000'],
          ['^@/?\\w'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error'
  }
}
