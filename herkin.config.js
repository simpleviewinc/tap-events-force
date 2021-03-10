const path = require('path')

module.exports = {
  paths: {
    // Absolute paths - The full path on the file system
    rootDir: __dirname,
    testsRoot: path.join(__dirname, 'tests'),

    // Relative to the testsRoot path
    reportsDir: 'reports',
    featuresDir: 'bdd/features',
    stepsDir: 'bdd/steps',
    supportDir: 'bdd/support',
    unitDir: 'unit',
    waypointDir: 'waypoint'
  },
  app: {
    url: 'http://evf-${branch}.local.kegdev.xyz'
  }
}
