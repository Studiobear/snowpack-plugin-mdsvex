module.exports = {
  moduleDirectories: ['node_modules', 'src', 'test'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*\\.test)\\.([tj]s)$',
  testPathIgnorePatterns: ['node_modules', '__fixtures__'],
  setupFilesAfterEnv: ['./test/setup.js'],
  collectCoverageFrom: ['./src/index.ts'],
  coverageDirectory: './coverage/',
}
