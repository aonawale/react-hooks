const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  setupFiles: ['<rootDir>/test/jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-tests.ts'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': ['babel-jest', {configFile: './test/babel.config.js'}],
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/test/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  modulePathIgnorePatterns: ['/.yarn/'],
  moduleNameMapper: {
    '^test-helpers$': '<rootDir>/test/helpers',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
}
