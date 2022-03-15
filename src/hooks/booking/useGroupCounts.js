import { useMemo } from 'react'
import { countAttendeesByTicket } from 'SVUtils/models/attendees/countAttendeesByTicket'
import { useIsAttendeeDisabledCallback } from 'SVHooks/models/attendees/useIsAttendeeDisabledCallback'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

/**
 * Helper for useGroupCounts that counts the number of
 * attendees who are disabled (according to isDisabledFn)
 * @param {Array<import('SVModels/Attendee').Attendee>} attendees - list of attendees
 * @param {Function<string, boolean>} isDisabledFn - returns true if the attendee is disabled from booking a session
 */
const countDisabled = (attendees, isDisabledFn) => {
  const disabledAttendees = attendees.filter(att =>
    isDisabledFn(att.bookedTicketIdentifier)
  )
  return disabledAttendees.length
}

/**
 * Computes some memoized counts of the attendee data structures
 * @param {import('SVModels/Session').Session} - the session for which to compute the counts
 * @return {Object} object with the computed values
 * {
 *  - sortedAttendeeCount: count of all attendees who are sorted into tickets
 *  - bookableAttendeeCount: number of attendees who are permitted to book the passed-in session
 *  - initialCapacityExceedsNeed: true if the session is unlimited or the remainingCount of the session is greater
 *                                than the bookable attendee count
 * }
 */
export const useGroupCounts = session => {
  const { remainingBookingPlaces } = parseSessionCapacity(session?.capacity)
  const isUnlimited = session?.capacity?.isUnlimited

  const { attendees, attendeesByTicket } = useStoreItems([
    'attendees',
    'attendeesByTicket',
  ])

  const isDisabled = useIsAttendeeDisabledCallback(session, attendees)

  return useMemo(() => {
    const sortedAttendeeCount = countAttendeesByTicket(attendeesByTicket)
    const disabledCount = countDisabled(attendees, isDisabled)

    // number of attendees that are eligible to book this session
    const bookableAttendeeCount = sortedAttendeeCount - disabledCount

    // only show the capacity of the session if the number of attendees exceeds the capacity
    const initialCapacityExceedsNeed =
      isUnlimited || remainingBookingPlaces > bookableAttendeeCount

    return {
      sortedAttendeeCount,
      bookableAttendeeCount,
      initialCapacityExceedsNeed,
    }
  }, [
    isUnlimited,
    attendees,
    attendeesByTicket,
    isDisabled,
    remainingBookingPlaces,
  ])
}
