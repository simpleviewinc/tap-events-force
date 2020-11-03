import { useCallback } from 'react'

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
export const useMockBookingCB = (
  setMockData,
  bookingDelay,
  isBookingCb = true
) =>
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
