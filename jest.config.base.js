// https://github.com/facebook/jest/issues/3112#issuecomment-398581705
module.exports = {
    roots: [
        "<rootDir>/src",
        "<rootDir>/tests"
    ],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testRegex: "(/tests/.*.(test|spec)).(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        "(tests/.*.mock).(jsx?|tsx?)$"
    ],
    verbose: true
};
