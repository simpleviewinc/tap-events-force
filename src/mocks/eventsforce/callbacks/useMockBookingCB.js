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

const updateMockState = (setMockData, sessionId, attendeeIds, isBookingCb) => {
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

/**
 * Returns a mock cb for booking or waiting list request.
 * When executed, it will update the attendees `bookingDelay` seconds later,
 * to match the requested changes, unless the mockData was updated with
 * an alert in the interim (to help with testing an error that might arise
 * when booking)
 * @param {Object} currentMockData
 * @param {Function} setMockData
 * @param {number} bookingDelay
 * @param {boolean} isBookingCb - true if booking request, false if waiting list request
 * @return {Function<Promise>} - resolves if the booking completed, throws if it did not
 */
export const useMockBookingCB = (setMockData, options = {}) => {
  const { isBookingCb = true, bookingDelay = 0, shouldReject = false } = options

  return useCallback(
    (sessionId, attendeeIds) => {
      return new Promise((resolve, reject) => {
        // if < 0, indicates the request should not resolve/complete
        if (bookingDelay < 0) return
        if (shouldReject)
          return reject(
            `${isBookingCb ? 'Booking' : 'Wait List'} request failed.`
          )

        // simulate a props-change after the booking-request cb would
        // have updated attendees in consumer's context
        setTimeout(() => {
          updateMockState(setMockData, sessionId, attendeeIds, isBookingCb)
          resolve()
        }, bookingDelay)
      })
    },
    [ setMockData, bookingDelay ]
  )
}

export const useMockBookingRequest = (setMockData, bookingDelay = 0) =>
  useMockBookingCB(setMockData, { isBookingCb: true, bookingDelay })

export const useMockWaitingRequest = (setMockData, bookingDelay = 0) =>
  useMockBookingCB(setMockData, { isBookingCb: false, bookingDelay })
