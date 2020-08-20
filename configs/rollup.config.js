import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import alias from '@rollup/plugin-alias'
import clear from 'rollup-plugin-clear'
import url from '@rollup/plugin-url'
import sucrase from '@rollup/plugin-sucrase'
import sourcemaps from 'rollup-plugin-sourcemaps'
import bundleSize from 'rollup-plugin-bundle-size'
import generatePackageJson from './plugins/generatePackageJson'

const path = require('path')
const tapPath = require('app-root-path').path
const corePath = path.join(`${tapPath}`, `node_modules/keg-core`)
const relativeTapPath = path.relative(__dirname, tapPath)

const peerExternals = [ 'react', 'react-dom' ]
const mainExternals = [
  '@expo',
  '@expo/vector-icons',
  '@ltipton/jsutils',
  'prop-types',
  'axios',
  'react-native',
  'react-native-web',
  'react-native-svg',
  'redux',
  'react-redux',
  'qr-reader',
]
const externals = [ ...mainExternals, ...peerExternals ]

const coreBabelConfig = require(path.join(corePath, 'babel.config.js'))()

// Rollup is having issue finding the (reTheme || kegComponents ).native.js files
// This creates custom alias to ensure then can be found
const buildAlias = builtAlias => {
  const svModules = path.join(corePath, 'node_modules/@simpleviewinc')
  const reTheme = path.join(svModules, 're-theme/build/esm/reTheme.native.js')
  const kegComponents = path.join(
    svModules,
    'keg-components/build/esm/kegComponents.native.js'
  )

  return {
    ...builtAlias,
    '@simpleviewinc/re-theme': reTheme,
    're-theme': reTheme,
    './reTheme': reTheme,
    '@simpleviewinc/keg-components': kegComponents,
    'keg-components': kegComponents,
    './kegComponents': kegComponents,
  }
}

coreBabelConfig.plugins[1][1].alias = buildAlias(coreBabelConfig.plugins[1][1].alias)

const cjsOutputName = 'keg-sessions.cjs.js'
const esmOutputName = 'keg-sessions.esm.js'

export default {
  context: 'global',
  input: `${tapPath}/Sessions.js`,
  output: [
    {
      file: `${tapPath}/build/${cjsOutputName}`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `${tapPath}/build/${esmOutputName}`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: externals,
  watch: { clearScreen: false },
  plugins: [
    // Allows loading fonts and images
    url({
      include: [ `${relativeTapPath}/**/*.png`, `${relativeTapPath}/**/*.ttf` ],
    }),
    json(),
    resolve({
      preferBuiltins: true,
      module: true,
      main: true,
    }),
    // Sets the alias built from the tap-resolver
    // A new component-resolver was added to tap-resolver
    // So be sure to use that branch or the build will fail
    alias({ entries: coreBabelConfig.plugins[1][1].alias }),
    sucrase({
      transforms: [ 'jsx', 'flow' ],
    }),
    commonjs(),
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.RE_PLATFORM': 'web',
      'process.env.PLATFORM': 'web',

      // rnw aliasing
      // rn and rnw are in "externals", causing the alias plugin to ignore them, so we have to manually replace
      "from 'react-native'": "from 'react-native-web'",
    }),
    // Not sure why, but getting lots of sourcemap errors
    // Need to investigate, maybe best to try and turn them off
    sourcemaps(),
    generatePackageJson({
      tapPath,
      corePath,
      peerExternals,
      externals: mainExternals, 
      baseContents: { main: `./${esmOutputName}` },
    }),
    cleanup(),
    bundleSize(),
  ],
}
