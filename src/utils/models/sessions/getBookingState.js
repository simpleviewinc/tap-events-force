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

  if (session.allowBooking) {
    // ON_WAITING_LIST - Any session where the session identifier is included in the waitingListSessions array for any attendee
    // ON_WAITING_LIST takes precedence over SELECTED
    const inAttendeeWaitingList = attendees.some(attendee =>
      attendee.waitingListSessions?.some(id => id === session.identifier)
    )
    if (inAttendeeWaitingList) return SESSION_BOOKING_STATES.ON_WAITING_LIST
    // SELECTED - Any session where the session identifier is included in the bookedSessions array for any attendee
    const inAttendeeBookedSessions = attendees.some(attendee =>
      attendee.bookedSessions?.some(id => id === session.identifier)
    )
    if (inAttendeeBookedSessions) return SESSION_BOOKING_STATES.SELECTED

    /**
     * SELECT - Any session where allowBooking is true and is either unlimited or has remaining places
     * WAITING_LIST - Any session where capacity is limited, has no remaining places and has a waiting list
     */
    return session.capacity?.isUnlimited ||
      session.capacity?.remainingPlaces > 0
      ? SESSION_BOOKING_STATES.SELECT
      : session.capacity?.isWaitingListAvailable
        ? SESSION_BOOKING_STATES.WAITING_LIST
        : SESSION_BOOKING_STATES.FULLY_BOOKED
  }

  return SESSION_BOOKING_STATES.READ_ONLY
}
