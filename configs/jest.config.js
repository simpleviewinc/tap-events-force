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
    // ex: SVMocks, SVUtils, SVActions
    '^SV([^\/]+)$': [
      `${rootDir}/src/$1/tapIndex.js`,
      `${rootDir}/src/$1/index.js`,
      `${rootDir}/node_modules/keg-core/core/$1/index.js`,
      `${rootDir}/node_modules/keg-core/core/base/$1/index.js`
    ],
    // ex: SVUtils/someUtil, SVActions/someAction
    '^SV(.*)[\/](.*)$': [
      `${rootDir}/src/$1/$2`,
      `${rootDir}/src/$1/$2`,
      `${rootDir}/node_modules/keg-core/core/$1/$2`,
      `${rootDir}/node_modules/keg-core/core/base/$1/$2`,
    ],
  },
  testPathIgnorePatterns: [`${rootDir}/node_modules/(?!(keg-core/node_modules)/)`, ],
  transformIgnorePatterns: [`${rootDir}/node_modules/(?!(keg-core)/)`],
}