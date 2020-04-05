// Jest configuration for api
const base = require("../../jest.config.base.js");

module.exports = {
    ...base,
    name: "condenser",
    displayName: "condenser",
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
