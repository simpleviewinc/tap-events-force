import React, { useState, useCallback } from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from './sessionsContainer'
import { displayName } from 'SVConfig'
import * as bookingStatesTestData from '../mocks/eventsforce/bookingStates'
import testData from '../mocks/eventsforce/testData.js'
import { useMockBookingCB } from '../mocks/eventsforce/callbacks/useMockBookingCB'
import { isNative } from 'SVUtils/platform/isNative'
import { TestData } from 'SVComponents/testData'
import { getURLParam, get, isNum } from '@keg-hub/jsutils'

const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
}

/**
 * Provides a booking delay value and setter, whose default
 * is 1 second or the value from the `bookDelay` url param
 */
const useBookingDelay = () => {
  const defaultDelay = getURLParam('bookDelay') ?? 1
  const [ bookingDelayInSeconds, setBookingDelay ] = useState(defaultDelay)
  return [ bookingDelayInSeconds, setBookingDelay ]
}

/**
 * Returns initial data for rootContainer, depending on if the state url
 * parameter is set.
 */
const getInitialTestData = () => {
  const defaultPath = getURLParam('state') ?? ''
  return get(bookingStatesTestData, defaultPath, testData)
}

/**
 * Root container for app Main.js
 * Currently only used in local development. Not exported by rollup (see apps/Sessions.js for that)
 */
export const RootContainer = withAppHeader(displayName, props => {
  const [ mockData, setMockData ] = useState(getInitialTestData())
  const [ bookingDelayInSeconds, setBookingDelay ] = useBookingDelay()

  const mockBookRequest = useMockBookingCB(
    setMockData,
    bookingDelayInSeconds * 1000
  )

  const mockWaitRequest = useMockBookingCB(
    setMockData,
    bookingDelayInSeconds * 1000,
    { isBookingCb: false }
  )

  const onSave = useCallback(
    (nextData, { bookingDelay }) => {
      setMockData(nextData)
      console.log({ bookingDelay })
      isNum(bookingDelay) && setBookingDelay(bookingDelay)
    },
    [ setMockData, setBookingDelay ]
  )

  return (
    <>
      { !isNative() && process.env.NODE_ENV === 'development' && (
        <TestData
          data={mockData}
          onSave={onSave}
        />
      ) }
      <SessionsContainer
        sessionAgendaProps={mockData}
        onDayChange={mockCallbacks.onDayChange}
        onSessionBookingRequest={mockBookRequest}
        onSessionWaitingListRequest={mockWaitRequest}
      />
    </>
  )
})
