import React, { useState, useCallback, useMemo } from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from './sessionsContainer'
import * as bookingStatesTestData from '../mocks/eventsforce/bookingStates'
import { isNative } from 'SVUtils/platform/isNative'
import { TestData } from 'SVComponents/testData'
import { getURLParam, get, isNum } from '@keg-hub/jsutils'
import { displayName } from 'SVConfig'
import {
  useMockBookingRequest,
  useMockWaitingRequest,
} from '../mocks/eventsforce/callbacks/useMockBookingCB'
import testData from '../mocks/eventsforce/testData.js'
import { evfModalBuilder } from '../mocks/eventsforce/evfModalBuilder'
import { EvfButton } from '../mocks/eventsforce/evfButton'

const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
}

/**
 * Provides a booking delay value and setter, whose default
 * is 1 second or the value from the `bookDelay` url param
 * @return {Array} [ bookingDelayMs, setBookingDelaySeconds ]
 */
const useBookingDelay = () => {
  const defaultDelay = getURLParam('bookDelay') ?? 1
  const [ bookingDelayInSeconds, setBookingDelay ] = useState(defaultDelay)
  return [ bookingDelayInSeconds * 1000, setBookingDelay ]
}

/**
 * Returns initial data for rootContainer, depending on if the state url
 * parameter is set.
 */
const useTestDataState = () => {
  const initialData = useMemo(() => {
    const defaultPath = getURLParam('state') ?? ''
    const formattedPath = defaultPath.replace(/-/gi, '.')
    return [ 'default', 'def', 'na', 'none' ].includes(formattedPath)
      ? testData
      : get(bookingStatesTestData, formattedPath, testData)
  }, [])

  return useState(initialData)
}

/**
 * Root container for app Main.js
 * Currently only used in local development. Not exported by rollup (see apps/Sessions.js for that)
 */
export const RootContainer = withAppHeader(displayName, props => {
  const [ mockData, setMockData ] = useTestDataState()
  const [ bookingDelay, setBookingDelay ] = useBookingDelay()

  const mockBookRequest = useMockBookingRequest(setMockData, { bookingDelay })
  const mockWaitRequest = useMockWaitingRequest(setMockData, { bookingDelay })

  const onSave = useCallback(
    (nextData, { bookingDelay }) => {
      setMockData(nextData)
      isNum(bookingDelay) && setBookingDelay(bookingDelay)
    },
    [ setMockData, setBookingDelay ]
  )
  const [modalParentProps] = useState({ className: 'evf-modal' })

  // IMPORTANT - should not be imported into the main sessions component export
  // This is for DEVELOPMENT only
  // Create the session modal component to be passed to the Sessions Component
  const SessionsModal = useMemo(() => {
    return evfModalBuilder(modalParentProps)
  }, [modalParentProps])

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
        ModalComponent={SessionsModal}
        ButtonComponent={EvfButton}
        showSessionDetailsModal={sessionID =>
          console.log('session details modal opened: ' + sessionID)
        }
      />
    </>
  )
})
