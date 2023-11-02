module.exports = {
  processors: [],
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss', 'stylelint-config-prettier'],
  rules: {
    'no-missing-end-of-source-newline': null,
    'declaration-block-no-duplicate-properties': true,
    'no-invalid-double-slash-comments': null,
    'scss/at-import-partial-extension': 'always',
    'scss/at-import-partial-extension-blacklist': ['.scss'],
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-id-pattern': null,
    'alpha-value-notation': null,
    indentation: 2,
    'number-leading-zero': 'never',
    'string-quotes': 'single',
    'declaration-block-trailing-semicolon': 'always',
    'length-zero-no-unit': true,
    'declaration-empty-line-before': ['never', { ignore: ['after-declaration'] }],
    'rule-empty-line-before': ['always', { except: ['after-single-line-comment', 'first-nested'] }],
    'block-closing-brace-empty-line-before': ['never'],
    'at-rule-empty-line-before': ['always', { ignore: ['inside-block', 'blockless-after-same-name-blockless'] }],
    'max-empty-lines': 1,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'unit-case': 'lower',
    'color-hex-case': 'upper',
    'value-keyword-case': 'lower',
    'function-name-case': 'lower',
    'property-case': 'lower',
    'at-rule-name-case': 'lower',
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-element-case': 'lower',
    'selector-type-case': 'lower',
    'media-feature-name-case': 'lower',
    'block-opening-brace-space-before': 'always',
    'comment-whitespace-inside': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-block-semicolon-space-before': 'never',
    'function-comma-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-combinator-space-after': 'always',
    'selector-list-comma-space-after': 'always',
    'selector-list-comma-space-before': 'never',
    'selector-descendant-combinator-no-non-space': true,
    'value-list-comma-space-after': 'always',
    'value-list-comma-space-before': 'never',
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)([-_]{1,2}[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    'scss/at-mixin-pattern': [
      '^([a-z][a-z0-9]*)([-_]{1,2}[a-z0-9]+)*$',
      {
        message: 'Expected mixin name to be kebab-case'
      }
    ],
    'scss/dollar-variable-pattern': [
      '^([a-z][a-z0-9]*)([-_]{1,2}[a-z0-9]+)*$',
      {
        message: 'Expected variable to be kebab-case'
      }
    ],
    'value-no-vendor-prefix': null
  }
}
