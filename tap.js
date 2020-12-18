
/**
 * It would be better to use the node core module `path`
 * But this file is imported into the the app rootContainer, which is frontend
 * So instead if finds the path to the tap root based on the Platform
 */
const tapRootPath = process.env.PLATFORM === 'web'
  ? '.'
  : '../..'

const pathToEntryPoint = `${tapRootPath}/apps/Main.js` 

module.exports = {
  name: 'events-force-x5',
  displayName: 'Events Force Mobile X5',
  keg: {
    routes: {
      '/': 'RootContainer',
      '/sessions': 'SessionsContainer',
    },
    tapResolver: {
      paths: {
        tapSrc: './src'
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
