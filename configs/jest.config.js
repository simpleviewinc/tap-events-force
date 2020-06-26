const kegPath = require('app-root-path').path
require('react')
/**
 * Modules that should be transpiled before the tests are run
 */
const transpileForTests = [
  'keg-core',
  '@expo(nent)?/.*',
  '@react-native-community',
  '@react-navigation/.*',
  '@unimodules/.*',
  'expo(nent)?',
  'expo-asset',
  'expo-constants',
  'expo-font',
  '@simpleviewinc/re-theme',
  'react-clone-referenced-element',
  'react-native',
  'react-navigation',
  'react-router-native',
  'react-router',
  'react-router-dom',
  'sentry-expo',
  'unimodules',
].join('|')

const rootDir = kegPath


module.exports = {
  rootDir,
  testMatch: [
    `${rootDir}/src/**/__tests__/**/*.js?(x)`,
  ],
  verbose: true,
  //testPathIgnorePatterns: [`<rootDir/>node_modules/(?!(keg-core/node_modules)/)`, ],
  //transformIgnorePatterns: [`node_modules/(?!(${transpileForTests})/)`],
}