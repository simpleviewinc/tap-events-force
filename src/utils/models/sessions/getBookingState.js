import { Values } from 'SVConstants'
import { getStore } from 'SVStore'

const { SESSION_BOOKING_STATES } = Values

/**
 * gets the booking state of the session
 * @param {import('SVModels/session').Session} session
 * @returns {SESSION_BOOKING_STATES}
 */
export const getBookingState = session => {
  const { items } = getStore()?.getState()
  const attendees = items?.attendees || []
  let state = 'read only'

  for (const attendee in attendees) {
    // Any session where the session identifier is included in the bookedSessions array for any attendee
    if (attendee.bookedSessions?.some(id => id === session.identifier))
      return SESSION_BOOKING_STATES.SELECTED

    // Any session where the session identifier is included in the waitingListSessions array for any attendee
    if (attendee.waitingListSessions?.some(id => id === session.identifier))
      return SESSION_BOOKING_STATES.ON_WAITING_LIST
  }

  /**
   * Any session where allowBooking is true and is either unlimited or has remaining places is AVAILABLE
   * Any session where capacity is limited, has no remaining places and has a waiting list is WAITING_LIST
   */
  if (session.allowBooking) {
    return session.capacity.isUnlimited || session.capacity.remainingPlaces > 0
      ? SESSION_BOOKING_STATES.AVAILABLE
      : session.capacity.isWaitingListAvailable
        ? SESSION_BOOKING_STATES.WAITING_LIST
        : state
  }

  return state
}
