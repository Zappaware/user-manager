// jest.config.mjs
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};