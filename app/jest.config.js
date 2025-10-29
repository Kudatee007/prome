module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: { "^.+\\.tsx?$": "ts-jest" },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/*.d.ts",
  ],
};
