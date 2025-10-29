import '@testing-library/jest-dom';

import type {Config} from 'jest';

const config: Config = {
  verbose: true,
};

export default config;

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts', '**/*.test.tsx']
  };