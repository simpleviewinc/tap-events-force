import React, { useState, useMemo } from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from './sessionsContainer'
import { displayName } from 'SVConfig'
import { isNative } from 'SVUtils/platform/isNative'
import { TestData } from 'SVComponents/testData'
import { getURLParam, get } from '@keg-hub/jsutils'
import {
  useMockBookingRequest,
  useMockWaitingRequest,
} from '../mocks/eventsforce/callbacks/useMockBookingCB'
import testData from '../mocks/eventsforce/testData.js'
import * as bookingStatesTestData from '../mocks/eventsforce/bookingStates'
import { evfModalBuilder } from '../mocks/eventsforce/evfModalBuilder'

const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
}

/**
 * Returns mock data for rootContainer, depending on if the state url
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

  const mockBookRequest = useMockBookingRequest(setMockData)
  const mockWaitRequest = useMockWaitingRequest(setMockData)
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
          onSave={setMockData}
        />
      ) }
      <SessionsContainer
        sessionAgendaProps={mockData}
        onDayChange={mockCallbacks.onDayChange}
        onSessionBookingRequest={mockBookRequest}
        onSessionWaitingListRequest={mockWaitRequest}
        ModalComponent={SessionsModal}
      />
    </>
  )
})
