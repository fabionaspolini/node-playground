/**
 * @type {import('jest').Config}
 */
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "@domain/(.*)": "<rootDir>/src/Domain/$1",
    "@application/(.*)": "<rootDir>/src/Application/$1",
    "@infrastructure/(.*)": "<rootDir>/src/Infrastructure/$1",
    "@api/(.*)": "<rootDir>/src/API/$1",
    "@core/(.*)": "<rootDir>/src/Core/$1"
  }
};
