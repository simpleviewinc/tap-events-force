import { useMemo } from 'react'
import { countAttendeesByTicket } from 'SVUtils/models/attendees/countAttendeesByTicket'

/**
 * Computes some memoized counts of the attendee data structures
 * @param {Object<string, Array<string>>} attendeesByTicket -- attendees sorted by ticket
 * @param {Array<string>} restrictedIdsForSession - ids of attendees who cannot book a session
 * @param {number} remainingCount - remaining count of a session
 * @param {boolean} isUnlimited - if a session is unlimited or not
 * @return {Object} counts
 */
export const useGroupCounts = (
  attendeesByTicket,
  restrictedIdsForSession,
  remainingCount,
  isUnlimited
) => {
  return useMemo(() => {
    const sortedAttendeeCount = countAttendeesByTicket(attendeesByTicket)

    // number of attendees that are eligible to book this session
    const bookableAttendeeCount =
      sortedAttendeeCount - restrictedIdsForSession.length

    // only show the capacity of the session if the number of attendees exceeds the capacity
    const initialCapacityExceedsNeed =
      isUnlimited || remainingCount > bookableAttendeeCount

    return {
      sortedAttendeeCount,
      bookableAttendeeCount,
      initialCapacityExceedsNeed,
    }
  }, [ attendeesByTicket, restrictedIdsForSession, remainingCount ])
}
