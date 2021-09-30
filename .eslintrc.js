'use strict';

const frontPaths = ['packages/**/admin/src/**/*.js', 'packages/**/tests/front/**/*.js', 'test/config/front/**/*.js'];

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    requireConfigFile: false,
  },
  overrides: [
    {
      files: ['packages/**/*.js', 'test/**/*.js', 'example/**/*.js'],
      excludedFiles: frontPaths,
      ...require('./.eslintrc.back.js'),
    },
    {
      files: frontPaths,
      ...require('./.eslintrc.front.js'),
    },
  ],
};
