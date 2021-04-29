
const isWeb = process.env.PLATFORM === 'web'

/**
 * It would be better to use the node core module `path`
 * But this file is imported into the the app rootContainer, which is frontend
 * So instead if finds the path to the tap root based on the Platform
 */
const pathToEntryPoint = isWeb
  ? `./apps/Main.js` 
  : `../../apps/Main.native.js` 


module.exports = {
  name: 'events-force-x5',
  alias: 'evf',
  displayName: 'Events Force Mobile X5',
  keg: {
    routes: {
      '/': 'RootContainer',
      '/sessions': 'SessionsContainer',
    },
    tapResolver: {
      paths: {
        tapSrc: './src',
        tapFonts: "./src/assets/fonts"
      },
      aliases: {
        dynamic: {
          Icons: 'assets/icons',
          Contexts: 'contexts'
        },
        web: {
          SVTapEntry: pathToEntryPoint
        },
        native: {
          SVTapEntry: pathToEntryPoint
        }
      }
    },
    paths: {
      buildConfig: 'configs/build.config.js'
    },
    // replacement definitions for both webpack and rollup builds
    envs: {}
  },
  expo: {
    name: 'tap-events-force',
    slug: 'tap-events-force'
  }
}
