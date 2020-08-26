const rootPath = require('app-root-path').path
const {keg} = require('keg-core/app.json')
const { mapObj } = require('@svkeg/jsutils')
const rootDir = rootPath

const aliases = keg.tapResolver.aliases
const namespace = aliases.nameSpace

/**
 * mapping our aliases to the proper location
 * @returns {object}
 */
const getDynamicAlias = () => {
  
  let map = {}

  // map the alias to look in the tap first, then keg-core
  mapObj(aliases.dynamic, (key, value) => {
    // ex: SVUtils/someUtil, SVActions/someAction
    map[`^${namespace}${key}[\/](.*)$`] = [
      `${rootDir}/src/${value}/$1`,
      `${rootDir}/node_modules/keg-core/core/${value}/$1`,
      `${rootDir}/node_modules/keg-core/core/base/${value}/$1`,
    ]

    // ex: SVUtils, SVActions
    if (value === 'constants') {
      map[`${namespace}${key}`] = [
        `${rootDir}/node_modules/keg-core/core/base/${value}/index.js`,
      ]
    }
    else {
      map[`${namespace}${key}`] = [
        `${rootDir}/src/${value}/tapIndex.js`,
        `${rootDir}/src/${value}/index.js`,
        `${rootDir}/node_modules/keg-core/core/${value}/index.js`,
        `${rootDir}/node_modules/keg-core/core/base/${value}/index.js`
      ]
    }
    
  })
  
  return map
}

module.exports = {
  rootDir,
  testMatch: [
    `${rootDir}/src/**/__tests__/**/*.js?(x)`,
  ],
  moduleDirectories: ['node_modules', 'node_modules/keg-core/node_modules'],
  verbose: true,
  moduleFileExtensions: [
    "js", 'web.js', 'native.js', "json", "jsx", "node"
  ],
  moduleNameMapper: {
    // SVStore only refers to keg store
    [`${namespace}Store`]: `${rootDir}/node_modules/keg-core/core/base/store/index.js`,
    [`${namespace}Config`]: [
      `${rootDir}/temp/tap.json`,
      `${rootDir}/tap.json`,
      `${rootDir}/node_modules/keg-core/app.json`
    ],
    [`${namespace}Mocks`]: `${rootDir}/src/mocks/index.js`,
    ...getDynamicAlias(),
  },
  testPathIgnorePatterns: [`${rootDir}/node_modules/(?!(keg-core/node_modules)/)`, ],
  transformIgnorePatterns: [`${rootDir}/node_modules/(?!(keg-core)/)`],
  globals: {
    __DEV__: true,
  },
}