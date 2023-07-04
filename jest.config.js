module.exports = {
  transformIgnorePatterns: [
    "node_modules/(typescript-exportdata)/.+\\.js$"
  ],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
};