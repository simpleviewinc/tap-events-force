import React, { useState, useMemo } from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from './sessionsContainer'
import { displayName } from 'SVConfig'
import { isNative } from 'SVUtils/platform/isNative'
import { TestData } from 'SVComponents/testData'
import { getURLParam, get } from '@keg-hub/jsutils'
import testData from '../mocks/eventsforce/testData.js'
import * as bookingStatesTestData from '../mocks/eventsforce/bookingStates'

const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
  onSessionBookingRequest: (session, attendees) => {
    console.log(attendees)
    console.log(session)
  },
}

/**
 * Returns mock data for rootContainer, depending on if the state url
 * parameter is set.
 */
const useTestDataState = () => {
  const initialData = useMemo(() => {
    const defaultPath = getURLParam('state') ?? ''
    return get(bookingStatesTestData, defaultPath, testData)
  }, [])

  return useState(initialData)
}

/**
 * Root container for app Main.js
 * Currently only used in local development. Not exported by rollup (see apps/Sessions.js for that)
 */
export const RootContainer = withAppHeader(displayName, props => {
  const [ mockData, setMockData ] = useTestDataState()

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
