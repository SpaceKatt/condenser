module.exports = {
    roots: ['./src/tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
