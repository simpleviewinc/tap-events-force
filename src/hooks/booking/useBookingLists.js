import { useMemo } from 'react'
import { getExistingWaitIds } from 'SVUtils/booking/getExistingWaitIds'
import { getExistingBookIds } from 'SVUtils/booking/getExistingBookIds'
import { useRestrictedAttendeeIds } from './useRestrictedAttendeeIds'

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
  existingBookIds,
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
  return existingBookIds
}

/**
 * Hook to acquire the **initial** booking and waiting lists for a session for the group booking modal
 * @param {import('SVModels/session').Session} session - session to get the booking & waiting lists for
 * @param {Array<import('SVModels/attendee').Attendee>} attendees - full list of attendees
 * @param {boolean} initialCapacityExceedsNeed - true if the initial capacity exceeds the potential
 * @return {Array} destructurable array of form:
 * [ initBookingList, initWaitingList, existingBookingList, existingWaitingList ]
 * - all lists filter out the ids of attendees who are restricted from booking or waiting on the session
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
    // existing waiting list, as determined strictly by the data, except we filter out any unbookable attendees
    const existingWaitingList = getExistingWaitIds(
      session?.identifier,
      attendees
    ).filter(attendeeIsBookable)

    // the initial waiting list to be used on the group booking modal. If the waiting list is available,
    // we use the existing waiting list, otherwise this list is empty
    const initWaitingList = waitingListIsAvailable ? existingWaitingList : []

    // the booking list, as determined by the data alone, without any pre-selection done,
    // but still filtering out unbookable attendees
    const existingBookingList = getExistingBookIds(
      session?.identifier,
      attendees
    ).filter(attendeeIsBookable)

    // The initial booking list to be used on the group booking modal. This might be equal to the
    // existing booking list, or it may be a list of pre-selected attendees given certain conditions
    const initBookingList = getInitialBookingIds(
      existingBookingList,
      attendees,
      initWaitingList,
      attendeeIsBookable,
      initialCapacityExceedsNeed
    )

    return [
      initBookingList,
      initWaitingList,
      existingBookingList,
      existingWaitingList,
    ]
  }, [
    session,
    attendees,
    attendeeIsBookable,
    initialCapacityExceedsNeed,
    waitingListIsAvailable,
  ])
}
