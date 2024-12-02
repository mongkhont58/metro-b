module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // For testing React components in Next.js
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Include .tsx and .ts files for coverage
    '!src/**/*.d.ts',    // Exclude TypeScript declaration files
    '!src/**/*.test.{ts,tsx}', // Exclude test files
    '!src/pages/_app.tsx', // Optionally exclude Next.js app file
    '!src/pages/_document.tsx', // Exclude document file
    '!src/pages/api/**', // Exclude API routes (unless testing them)
  ],
  coverageDirectory: 'coverage', // Directory for coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Output formats
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

