const config = require('./project.config');

const jestConfig = {
    rootDir: config.paths.base(),
    displayName: '2048',
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    roots: [
        "<rootDir>",
        "./"
    ],
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    },
    modulePaths: [
        "<rootDir>",
        "./"
    ],
    moduleDirectories: [
        "node_modules"
    ],
    setupFilesAfterEnv: [
        './src/setupTests.ts',
        'dotenv/config',
        "@testing-library/jest-dom/extend-expect"
    ],
    moduleNameMapper: {
        '.(png|jpg|svg)$': "<rootDir>/support/fileLoaderStub.js",
        '^.+\\.(css|less|scss)$': '<rootDir>/support/styleLoaderStub.js',
    },
    modulePathIgnorePatterns: ['setupTests.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/components/**/*.{ts,tsx}',
        'src/lib/**/*.{ts,tsx}',
        'src/utils/**/*.{ts,tsx}',
        'src/{App}.{tsx}'
    ],
    testRegex: '\\.spec\\.(ts|tsx)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './reports',
                filename: 'jest-report.html'
            }
        ],
        [
            'jest-junit',
            {
                outputDirectory: './reports',
                outputName: 'jest-junit.xml'
            }
        ]
    ]
};

if (process.env.TEST_ENV === 'watch') {
    jestConfig.collectCoverage = false
}

module.exports = jestConfig;
