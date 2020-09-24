import { useMemo } from 'react'
import { countAttendeesByTicket } from 'SVUtils/models/attendees/countAttendeesByTicket'

/**
 * Computes some memoized counts of the attendee data structures
 * @param {*} attendeesByTicket
 * @param {*} restrictedIdsForSession
 * @param {*} remainingCount
 * @return {Object} counts
 */
export const useGroupCounts = (
  attendeesByTicket,
  restrictedIdsForSession,
  remainingCount
) => {
  return useMemo(() => {
    const sortedAttendeeCount = countAttendeesByTicket(attendeesByTicket)

    // number of attendees that are eligible to book this session
    const bookableAttendeeCount =
      sortedAttendeeCount - restrictedIdsForSession.length

    // only show the capacity of the session if the number of attendees exceeds the capacity
    const initialCapacityExceedsNeed = remainingCount > bookableAttendeeCount

    return {
      sortedAttendeeCount,
      bookableAttendeeCount,
      initialCapacityExceedsNeed,
    }
  }, [ attendeesByTicket, restrictedIdsForSession, remainingCount ])
}
