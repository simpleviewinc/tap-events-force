const path = require('path')

module.exports = {
  paths: {
    rootDir: __dirname,
    reportsDir: 'reports',
    testsRoot: path.join(__dirname, 'tests'),
    featuresDir: 'bdd/features',
    supportDir: 'bdd/support',
    stepsDir: 'bdd/steps',
    unitDir: 'unit',
    waypointDir: 'waypoint'
  }
}