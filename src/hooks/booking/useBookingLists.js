import { useMemo } from 'react'

/**
 * Builds the initial list of ids of attendees on the waiting list for the session
 * @param {Object} session
 * @param {Array<import('SVModels/attendee').Attendee>}  attendees
 * @param {Function} isBookable
 */
const getInitialWaitIds = (session, attendees, isBookable) => {
  return attendees.reduce((list, attendee) => {
    const { waitingListSessions, bookedTicketIdentifier: id } = attendee
    const shouldWait =
      isBookable(attendee) && waitingListSessions?.includes(session?.identifier)
    return shouldWait ? [ ...list, id ] : list
  }, [])
}

/**
 * Builds the initial list of booked attendee ids for the session
 * @param {Object} session
 * @param {Array<string>} attendees
 * @param {Array<string>} initialWaitIds
 * @param {Function} isBookable
 * @param {boolean} initialCapacityExceedsNeed
 */
const getInitialBookedIds = (
  session,
  attendees,
  initialWaitIds,
  isBookable,
  initialCapacityExceedsNeed
) => {
  // if nobody is on the waiting list, and the capacity of session is greater than the number of attendees,
  // include all the attendees that are bookable
  if (initialCapacityExceedsNeed && !initialWaitIds?.length)
    return attendees
      .filter(isBookable)
      .map(attendee => attendee.bookedTicketIdentifier)

  return attendees.reduce((list, attendee) => {
    const { bookedSessions, bookedTicketIdentifier: id } = attendee

    // if the attendee is restricted against this session, or is already on the wait list,
    // immediately return to exclude them from this list
    if (!isBookable(attendee) || initialWaitIds?.includes(id)) return list

    // otherwise, include attendee in list only if the they are already booked against this session
    return bookedSessions?.includes(session?.identifier) ? [ ...list, id ] : list
  }, [])
}

/**
 * Hook to acquire the **initial** booking and waiting lists for a session
 * @param {import('SVModels/session').Session} session
 * @param {Array<import('SVModels/attendee').Attendee>} attendees
 * @param {Function<void, boolean>} attendeeIsBookable
 * @param {boolean} initialCapacityExceedsNeed
 * @param {boolean} waitingListIsAvailable
 */
export const useBookingLists = (
  session,
  attendees,
  attendeeIsBookable,
  initialCapacityExceedsNeed,
  waitingListIsAvailable
) => {
  return useMemo(() => {
    const waitingList = waitingListIsAvailable
      ? getInitialWaitIds(session, attendees, attendeeIsBookable)
      : []

    const bookingList = getInitialBookedIds(
      session,
      attendees,
      waitingList,
      attendeeIsBookable,
      initialCapacityExceedsNeed
    )

    return [ bookingList, waitingList ]
  }, [
    session,
    attendees,
    attendeeIsBookable,
    initialCapacityExceedsNeed,
    waitingListIsAvailable,
  ])
}
