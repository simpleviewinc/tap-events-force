import { Values } from 'SVConstants'
import { isPositive, exists } from '@keg-hub/jsutils'
const { SESSION_BOOKING_STATES } = Values

/**
 * Checks if the booking display should be disabled from interaction
 * @param {Object} props
 * @param {import('SVModels/session').Session} props.session
 * @param {import('SVModels/PendingSession').PendingSession} props.pendingSession - currently pending session, if there is one
 * @param {Number} props.bookableCount - Attendees that can book the current session
 * @param {string} props.bookingMode - Current mode of booking for the session (single|group)
 * @param {Object} props.timeConflicts - Key value pairs of attendees booked in conflicting sessions. { ${attendeeId}: ${sessionId} }
 * @param {Object} state
 *
 * @returns {boolean} - If the display interaction should be disabled
 */
export const getDisabled = (
  {
    session,
    pendingSession,
    bookableCount,
    bookingMode,
    timeConflicts,
    bookingList,
    waitingList,
  },
  state
) => {
  // if there is a different session awaiting the booking request result, all others are disabled
  if (
    pendingSession?.identifier &&
    pendingSession.identifier !== session.identifier
  )
    return true
  // If state is select, and in single booking mode and there's a time conflict
  // Then the booking state should be disabled
  if (
    state === SESSION_BOOKING_STATES.SELECT &&
    bookingMode === 'single' &&
    timeConflicts
  )
    return true

  const { capacity, allowBooking } = session

  // no capacity if bookableCount === 0 OR waitingList with spaces is not available
  const noCapacity =
    (exists(bookableCount) && !isPositive(bookableCount)) ||
    !(
      capacity?.remainingPlaces ||
      capacity?.isWaitingListAvailable ||
      capacity?.isUnlimited
    )

  const hasExistingBookings = bookingList.length || waitingList.length

  // disable if there's no space left (and no pre-booked attendees)
  // or if everyone in the group is booked on a conflicting session
  return !allowBooking || (noCapacity && !hasExistingBookings)
}
