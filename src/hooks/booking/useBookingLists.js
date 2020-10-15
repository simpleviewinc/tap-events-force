import { useMemo } from 'react'
import { getExistingWaitIds } from 'SVUtils/booking/getExistingWaitIds'
import { getExistingBookIds } from 'SVUtils/booking/getExistingBookIds'
import { useRestrictedAttendeeIds } from './useRestrictedAttendeeIds'

/**
 * Builds the initial list of ids of attendees on the waiting list for the session
 * @param {Object} session - session to find attendees on the waiting list for
 * @param {Array<import('SVModels/attendee').Attendee>} attendees - all attendees
 * @param {Function} isBookable - cb of form: attendeeId => true/false if bookable/waitListable to the session
 * @return {Array<string>} initial waiting ids ids
 */
const getInitialWaitIds = (session, attendees, isBookable) => {
  const existingIds = getExistingWaitIds(session?.identifier, attendees)
  return existingIds.filter(isBookable)
}

/**
 * Builds the initial list of booked attendee ids for the session
 * @param {Object} session - session object
 * @param {Array<string>} attendees - full list of attendees
 * @param {Array<string>} initialWaitIds - list of ids on the initial waiting list
 * @param {Function} isBookable - cb of form: attendeeId => true/false if bookable/waitListable to the session
 * @param {boolean} initialCapacityExceedsNeed - true if the initial capacity exceeds the potential
 * @return {Array<string>} initial booking ids
 */
const getInitialBookingIds = (
  session,
  attendees,
  initialWaitIds,
  isBookable,
  initialCapacityExceedsNeed
) => {
  // if nobody is on the waiting list, and the capacity of session is greater than the number of attendees,
  // include all the attendees that are bookable
  if (initialCapacityExceedsNeed && !initialWaitIds?.length)
    return attendees.reduce((ids, nextAttendee) => {
      if (!isBookable(nextAttendee)) return ids
      ids.push(nextAttendee.bookedTicketIdentifier)
      return ids
    }, [])

  // otherwise just get the existing list of booked ids, removing any ones that aren't bookable
  return getExistingBookIds(session?.identifier, attendees).filter(isBookable)
}

/**
 * Hook to acquire the **initial** booking and waiting lists for a session
 * @param {import('SVModels/session').Session} session - session to get the booking & waiting lists for
 * @param {Array<import('SVModels/attendee').Attendee>} attendees - full list of attendees
 * @param {boolean} initialCapacityExceedsNeed - true if the initial capacity exceeds the potential
 * @return {Array} destructurable array of form:
 * [ bookingList, waitingList ]
 */
export const useBookingLists = (
  session,
  attendees,
  initialCapacityExceedsNeed
) => {
  const attendeeIsBookable =
    useRestrictedAttendeeIds(session?.identifier)?.isBookable || (() => true)

  const waitingListIsAvailable = session?.capacity?.isWaitingListAvailable

  return useMemo(() => {
    // get the existing ids of attendees on the session's waiting list
    const waitingList = waitingListIsAvailable
      ? getInitialWaitIds(session, attendees, attendeeIsBookable)
      : []

    // builds the initial booking list ids. This could be more than the existing list,
    // because certain conditions pre-select all the attendees
    const bookingList = getInitialBookingIds(
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
