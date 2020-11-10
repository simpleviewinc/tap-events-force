import { useCallback } from 'react'

const isSet = str => Boolean(str) && str !== ''
const alertIsSet = mockData => {
  return isSet(mockData?.alert?.title) && isSet(mockData?.alert?.message)
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
 * Returns a mock cb for booking or waiting list request.
 * When executed, it will update the attendees `bookingDelay` seconds later,
 * to match the requested changes, unless the mockData was updated with
 * an alert in the interim (to help with testing an error that might arise
 * when booking)
 * @param {Function} setMockData - function for updating the mock data
 * @param {number} bookingDelay - time to wait before making the props update
 * @param {boolean} isBookingCb - true if booking request, false if waiting list request
 */
export const useMockBookingCB = (
  setMockData,
  bookingDelay,
  isBookingCb = true
) => {
  return useCallback(
    (sessionId, attendeeIds) => {
      // if < 0, indicates the request should not complete
      if (bookingDelay < 0) return

      const updateState = () => {
        setMockData(current => ({
          ...current,
          alert: {},
          attendees: !alertIsSet(current)
            ? updateAttendees(current.attendees, sessionId, {
                bookedIds: isBookingCb ? attendeeIds : null,
                waitIds: !isBookingCb ? attendeeIds : null,
              })
            : current.attendees,
        }))
      }

      // simulate a props-change after the booking-request cb would
      // have updated attendees in consumer's context
      setTimeout(updateState, bookingDelay)
    },
    [ setMockData, bookingDelay ]
  )
}

export const useMockBookingRequest = (setMockData, bookingDelay = 0) =>
  useMockBookingCB(setMockData, bookingDelay, true)

export const useMockWaitingRequest = (setMockData, bookingDelay = 0) =>
  useMockBookingCB(setMockData, bookingDelay, false)
