import React, { useState, useCallback } from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from './sessionsContainer'
import { displayName } from 'SVConfig'
import testData from '../mocks/eventsforce/testData.js'
import { isNative } from 'SVUtils/platform/isNative'
import { TestData } from 'SVComponents/testData'
import { queryToObj } from '@keg-hub/jsutils'

const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
}

/**
 * Simulates a consumer props-update that would follow a booking request,
 * updating attendees to match the pending book-list and wait-list ids
 * @param {Array<Attendee>} attendees
 * @param {string} sessionId
 * @param {Object} bookingData
 * @return {Array<Attendee>} attendee list updated with new booked and wait-listed sessions
 */
const updateAttendees = (attendees, sessionId, { bookedIds, waitIds }) => {
  return attendees.map(att => ({
    ...att,
    bookedSessions: bookedIds?.includes(att.bookedTicketIdentifier)
      ? Array.from(new Set([ ...(att.bookedSessions || []), sessionId ]))
      : att.bookedSessions?.filter(id => !bookedIds || id !== sessionId),
    waitingListSessions: waitIds?.includes(att.bookedTicketIdentifier)
      ? Array.from(new Set([ ...(att.waitingListSessions || []), sessionId ]))
      : att.waitingListSessions?.filter(id => !waitIds || id !== sessionId),
  }))
}

/**
 * Returns a mock cb for booking or waiting list request
 * @param {Function} setMockData
 * @param {number} bookingDelay
 * @param {boolean} isBookingCb
 */
const useMockBookingCB = (setMockData, bookingDelay, isBookingCb = true) =>
  useCallback((sessionId, attendeeIds) => {
    // if < 0, indicates the request should not complete
    if (bookingDelay < 0) return

    const updateState = () =>
      setMockData(current => ({
        ...current,
        attendees: updateAttendees(current.attendees, sessionId, {
          bookedIds: isBookingCb ? attendeeIds : null,
          waitIds: !isBookingCb ? attendeeIds : null,
        }),
      }))

    // simulate a props-change after the booking-request cb would
    // have updated attendees in consumer's context
    setTimeout(updateState, bookingDelay)
  })

/**
 * Provides a booking delay value and setter, whose default
 * is 1 second or the value from the `bookDelay` url param
 */
const useBookingDelay = () => {
  const doc = typeof document !== 'undefined' ? document : null
  const defaultDelay = !isNative()
    ? queryToObj(doc?.location?.search)?.bookDelay ?? 1
    : 1

  const [ bookingDelayInSeconds, setBookingDelay ] = useState(defaultDelay)
  return [ bookingDelayInSeconds, setBookingDelay ]
}

/**
 * Root container for app Main.js
 * Currently only used in local development. Not exported by rollup (see apps/Sessions.js for that)
 */
export const RootContainer = withAppHeader(displayName, props => {
  const [ mockData, setMockData ] = useState(testData)
  const [ bookingDelayInSeconds, setBookingDelay ] = useBookingDelay()

  const mockBookRequest = useMockBookingCB(
    setMockData,
    bookingDelayInSeconds * 1000
  )

  const mockWaitRequest = useMockBookingCB(
    setMockData,
    bookingDelayInSeconds * 1000,
    false
  )

  const onSave = useCallback(
    (nextData, { bookingDelay }) => {
      setMockData(nextData)
      setBookingDelay(bookingDelay)
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
