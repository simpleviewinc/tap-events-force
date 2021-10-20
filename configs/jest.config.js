const rootPath = require('app-root-path').path
const { keg } = require('keg-core/app.json')
const { mapObj } = require('@keg-hub/jsutils')
const path = require('path')

const rootDir = rootPath
const aliases = keg.tapResolver.aliases
const namespace = aliases.nameSpace
const coreModulesPath = `${rootPath}/node_modules/keg-core/node_modules`

// Lock down the sv repos to point to the version installed in keg-core
const getKegRepoPaths = () => {
  const repoRoot = `${coreModulesPath}/@keg-hub`
  return {
    [`^@keg-hub/re-theme$`]: path.join(repoRoot, 're-theme'),
    [`@keg-hub/jsutils`]: path.join(repoRoot, 'jsutils'),
    [`@keg-hub/keg-components`]: path.join(repoRoot, 'keg-components'),
    '^@keg-hub/re-theme/styleInjector$': `${rootDir}/node_modules/@keg-hub/re-theme/build/cjs/web/styleInjector.js`,
    '^@keg-hub/re-theme/styleParser$': `${rootDir}/node_modules/@keg-hub/re-theme/build/cjs/web/styleParser.js`,
    '^@keg-hub/re-theme/reStyle$': `${rootDir}/node_modules/@keg-hub/re-theme/build/cjs/web/reStyle.js`,
  }
}

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
      map[`^${namespace}${key}`] = [
        `${rootDir}/node_modules/keg-core/core/base/${value}/index.js`,
      ]
    }
    else {
      map[`^${namespace}${key}`] = [
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
  rootDir: path.resolve(__dirname, '../'),
  preset: `./node_modules/keg-core/node_modules/jest-expo/web/jest-preset.js`,
  testMatch: [
    `${rootDir}/src/**/__tests__/**/*.js?(x)`,
  ],
  moduleDirectories: [
    'node_modules', 
    'node_modules/keg-core/node_modules',
    `${rootDir}/src/testutils`
  ],
  verbose: true,
  moduleFileExtensions: [
    "js", 'web.js', 'native.js', "json", "jsx", "node"
  ],
  moduleNameMapper: {
    // SVStore only refers to keg store
    [`${namespace}Store`]: `${rootDir}/node_modules/keg-core/core/base/store/index.js`,
    [`${namespace}TestUtils`]: `${rootDir}/src/testutils`,
    [`${namespace}Config`]: [
      `${rootDir}/temp/tap.json`,
      `${rootDir}/tap.json`,
      `${rootDir}/node_modules/keg-core/app.json`
    ],
    [`${namespace}Mocks`]: `${rootDir}/src/mocks/index.js`,
    'react-native$': path.join(coreModulesPath, 'react-native-web'),
    ...getDynamicAlias(),
    ...getKegRepoPaths(),
  },
  testPathIgnorePatterns: [`${rootDir}/node_modules/(?!(keg-core/node_modules)/)`, ],
  transformIgnorePatterns: [`${rootDir}/node_modules/(?!(keg-core)/)`],
  globals: {
    __DEV__: true,
  },
}
