import React from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from 'SVContainers'
import { displayName } from 'SVConfig'

import testData from '../mocks/eventsforce/testData'
const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
}

/**
 * Root container for app Main.js
 * Currently only used in local development. Not exported by rollup (see apps/Sessions.js for that)
 */
export const RootContainer = withAppHeader(displayName, props => {
  return <SessionsContainer
    {...testData}
    {...mockCallbacks}
  />
})
