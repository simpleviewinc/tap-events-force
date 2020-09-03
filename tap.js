const path = require('path')

const pathToEntryPoint = process.env.TEST_BUILD 
  ? path.join(__dirname, 'apps/BuildTest.js') 
  : path.join(__dirname, 'apps/Main.js')

module.exports = {
  name: 'events-force-x5',
  displayName: 'Events Force Mobile X5',
  keg: {
    routes: {
      '/': 'RootContainer',
      '/sessions': 'SessionsContainer',
      '/test': 'TestContainer',
      '/qr': 'QRContainer'
    },
    tapResolver: {
      paths: {
        tapSrc: './src'
      },
      aliases: {
        dynamic: {
          Icons: 'assets/icons'
        },
        web: {
          SVTapEntry: pathToEntryPoint
        }
      }
    },
    versions: {
      development: '1.0.0',
      production: '1.0.0',
      qa: '1.0.0',
      staging: '1.0.0'
    },
    paths: {
      buildConfig: 'configs/build.config.js'
    }
  },
  expo: {
    name: 'tap-events-force',
    slug: 'tap-events-force'
  }
}
