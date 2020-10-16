import React, { useState } from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from './sessionsContainer'
import { displayName } from 'SVConfig'
// import testData from '../mocks/eventsforce/testData.js'
import { isNative } from 'SVUtils/platform/isNative'
import { TestData } from 'SVComponents/testData'
import * as bookingStatesTestData from '../mocks/eventsforce/bookingStates'

const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
  onSessionBookingRequest: (session, attendees) => {
    console.log(attendees)
    console.log(session)
  },
}

/**
 * Root container for app Main.js
 * Currently only used in local development. Not exported by rollup (see apps/Sessions.js for that)
 */
export const RootContainer = withAppHeader(displayName, props => {
  // const [ mockData, setMockData ] = useState(testData)
  const [ mockData, setMockData ] = useState(
    bookingStatesTestData.selected.single.check
  )

  return (
    <>
      { !isNative() && process.env.NODE_ENV === 'development' && (
        <TestData
          data={mockData}
          onSave={setMockData}
        />
      ) }
      <SessionsContainer
        sessionAgendaProps={mockData}
        onDayChange={mockCallbacks.onDayChange}
        onSessionBookingRequest={mockCallbacks.onSessionBookingRequest}
      />
    </>
  )
})
