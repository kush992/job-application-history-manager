/** ESLint configuration: typescript + next + import sorting + unused imports removal */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports', 'import'],
  rules: {
    // Sort imports into groups and alphabetical order
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Remove unused imports automatically and let this plugin handle unused vars
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
    ],

    // Turn off the base rule in favor of the unused-imports plugin
    '@typescript-eslint/no-unused-vars': 'off',

    // Note: empty import specifiers like `import {} from 'x'` are removed by the cleanup script.

    // Minor style choices
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Relax some strict TS rules to reduce noise; prefer addressing these gradually
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-types': ['warn', { types: { Object: false } }]
  }
};
