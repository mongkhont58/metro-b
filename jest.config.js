module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Required for testing React components
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Include TS and TSX files
    '!src/**/*.d.ts',    // Exclude type definitions
    '!src/**/node_modules/**', // Exclude dependencies
    '!src/pages/_app.tsx', // Optionally exclude boilerplate files
    '!src/pages/_document.tsx',
  ],
  coverageDirectory: 'coverage', // Directory to output coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Formats of the coverage report
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

