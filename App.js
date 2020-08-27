import React from 'react'

/**
 * @returns {Component} - the sessions component as built by rollup, and default-exported in ./build/keg-sessions.esm.js
 *
 * Also ensures it gets injected with test data
 */
const getBuiltApp = () => {
  const testData = require('./src/mocks/eventsforce/testData.js').default
  const BuiltApp = require('./build/keg-sessions.esm.js').default
  return () => <BuiltApp {...testData} />
}

/**
 * @returns {Component} the main app component
 */
const getMainApp = () => require('./apps/Main.js').default

// TODO: update webpack.config.js in keg-core with the definePlugin to set this value based on an environment variable
const TEST_BUILD = false

/**
 * Uses apps/Main.js if TEST_BUILD environment variable is false, otherwise
 * expects the build in `build/keg-sessions.esm.js` to be present and will use that
 *
 * This file is not used by the rollup build. @see apps/Sessions.js for rollup's entry
 */
export default TEST_BUILD ? getBuiltApp() : getMainApp()
