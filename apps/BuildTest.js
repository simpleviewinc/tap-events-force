import React from 'react'
import testData from '../src/mocks/eventsforce/testData.js'
import Sessions from '../build/keg-sessions.esm.js'

const mockCallbacks = {
  onDayChange: day => console.log('Day change', day)
}

/**
 * BuildTest
 * A test app that uses the rollup build of the Sessions component, with mock data
 * @see `./Sessions.js`
 */
const BuildTest = props => {
  return (
    <Sessions 
      { ...testData} 
      { ...mockCallbacks }
    />
  )
}

export default BuildTest