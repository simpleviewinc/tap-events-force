import analyze from 'rollup-plugin-analyzer'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import alias from '@rollup/plugin-alias'
import clear from 'rollup-plugin-clear'
import sucrase from '@rollup/plugin-sucrase'
import sourcemaps from 'rollup-plugin-sourcemaps'
import bundleSize from 'rollup-plugin-bundle-size'
import generatePackageJson from './plugins/generatePackageJson'
import image from '@rollup/plugin-image'
import { terser } from "rollup-plugin-terser"

const path = require('path')
const tapPath = require('app-root-path').path
const corePath = path.join(`${tapPath}`, `node_modules/keg-core`)
const isProd = process.env.NODE_ENV === 'production'
const { ANALYZE } = process.env

const peerExternals = [ 'react', 'react-dom' ]
const mainExternals = [
  '@keg-hub/jsutils',
  'prop-types',
  'axios',
  'react-native',
  'react-native-web',
  'react-native-svg',
  'redux',
  'react-redux',
]
const externals = [ ...mainExternals, ...peerExternals ]

const coreBabelConfig = require(path.join(corePath, 'babel.config.js'))()

// Rollup is having issue finding the (reTheme || kegComponents ) build files
// This creates custom alias to ensure then can be found
const buildAlias = builtAlias => {
  const svModules = path.join(corePath, 'node_modules/@keg-hub')
  const reTheme = path.join(svModules, 're-theme/build/esm/web')
  const kegComponents = path.join(
    svModules,
    'keg-components/build/esm/kegComponents.js'
  )

  const reThemeAliases = {
    '@keg-hub/re-theme': reTheme,
    're-theme': reTheme,
    './reTheme': reTheme,
  }

  const kegComponentAliases = {
    '@keg-hub/keg-components': kegComponents,
    'keg-components': kegComponents,
    './kegComponents': kegComponents,
  }

  return {
    ...builtAlias,
    ...reThemeAliases,
    ...kegComponentAliases,
    './keyStore': './keyStore.web.js'
  }
}

const moduleResolver = coreBabelConfig
  .plugins
  .find(([ name ]) => name === 'module-resolver')[1]
const setAliases = (aliases) => (moduleResolver.alias = aliases)

setAliases(buildAlias(moduleResolver.alias))

const cjsOutputName = 'keg-sessions.cjs.js'
const esmOutputName = 'keg-sessions.esm.js'

/**
 * The path to place all output build files
 */
const buildDirPath = process.env.KEG_CONSUMER_BUILD_PATH || `${tapPath}/build`

/**
 * Rollup config for tap-events-force, used in keg-core
 * @see `yarn roll:dev`
 */
export default {
  context: 'global',
  input: `${tapPath}/apps/Sessions.js`,
  output: [
    {
      file: `${buildDirPath}/${cjsOutputName}`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `${buildDirPath}/${esmOutputName}`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: externals,
  watch: { clearScreen: false },
  plugins: [
    json(),
    resolve({
      preferBuiltins: true,
      module: true,
      main: true,
      // ensures these dependencies aren't duplicated in the build
      dedupe: [ '@keg-hub/re-theme', '@keg-hub/keg-components', '@keg-hub/jsutils', '@keg-hub/tap-resolver' ]
    }),
    alias({ entries: moduleResolver.alias }),
    sucrase({
      transforms: [ 'jsx', 'flow' ],
    }),
    commonjs(),
    image(),
    babel({
      include: [`${tapPath}/**`],
      babelHelpers: 'runtime',
      babelrc: false,
      ...coreBabelConfig,
    }),
    // The rollup output is exported to <tap>/build/<output>
    // This clears that directory to ensure each build is fresh
    clear({
      targets: [`${tapPath}/build`],
      watch: false,
    }),
    replace({
      // search for all cases of strings
      delimiters: [ '', '' ],

      // environment replacements
      'process.env.IS_BUILD': 'true',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.RE_PLATFORM': 'web',
      'process.env.PLATFORM': 'web',

      // rnw aliasing
      // rn and rnw are in "externals", causing the alias plugin to ignore them, so we have to manually replace
      "from 'react-native'": "from 'react-native-web'",
      "from 'react-native-svg'": "from 'react-native-svg-web'",
    }),
    sourcemaps(),
    generatePackageJson({
      tapPath,
      corePath,
      peerExternals,
      externals: mainExternals, 
      baseContents: { 
        name: '@keg-hub/tap-evf-sessions',
        main: `./${esmOutputName}`,
        module: `./${esmOutputName}` 
      },
    }),
    cleanup(),
    isProd && terser(),
    bundleSize(),
    ANALYZE && analyze()
  ],
}
