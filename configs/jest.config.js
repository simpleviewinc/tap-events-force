const rootPath = require('app-root-path').path


const rootDir = rootPath

module.exports = {
  rootDir,
  testMatch: [
    `${rootDir}/src/**/__tests__/**/*.js?(x)`,
  ],
  moduleDirectories: ['node_modules', 'node_modules/keg-core/node_modules'],
  verbose: true,
  moduleNameMapper: {
    SVMocks: [`${rootDir}/src/mocks/index.js`, `${rootDir}/node_modules/keg-core/core/mocks/index.js`]
  },
  testPathIgnorePatterns: [`${rootDir}/node_modules/(?!(keg-core/node_modules)/)`, ],
  //transformIgnorePatterns: [`node_modules/(?!(keg-core)/)`],
}