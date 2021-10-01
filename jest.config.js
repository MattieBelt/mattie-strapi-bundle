'use strict';

module.exports = {
  name: 'Mattie strapi bundle Tests',
  testMatch: ['<rootDir>/**/?(*.)+(spec|test).unit.js'],
  modulePathIgnorePatterns: ['.cache'],
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/test/unit.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['packages/**/*.js', 'example/**/*.js'],
  coveragePathIgnorePatterns: ['build', '.cache'],
};
