// jest.config.ts
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["**/tests/**/*.test.ts"],
  modulePathIgnorePatterns: ["node_modules", ".git"],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  collectCoverageFrom: ["./src/**", "!./src/index.ts"],
  coverageDirectory: "./tests/coverage",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
