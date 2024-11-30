const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js project root
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Point to the setup file
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Resolve `@` alias for imports
  },
};

module.exports = createJestConfig(customJestConfig);
