import { useState, useEffect } from 'react'
import { useBookingLists } from './useBookingLists'
import {
  setWaitingList,
  setBookingList,
  setInitialWaitingList,
  setInitialBookingList,
  setSessionCapacity,
  setCurrentSessionId,
} from 'SVActions/session/booking'

/**
 * Initializes the store items related to the group booking UI
 * @param {import('SVModels/session').Session} session - current session to be considered for group booking
 * @param {Array<import('SVModels/attendee').Attendee>} attendees - list of attendees
 * @param {boolean} initialCapacityExceedsNeed - if true, then the session has greater capacity than the number of bookable attendees
 * @returns {boolean} true if the store is initialized with the data, false otherwise
 */
export const useInitGroupBooking = (
  session,
  attendees,
  initialCapacityExceedsNeed,
  remainingCount
) => {
  const [ initialBookedIds, initialWaitIds ] = useBookingLists(
    session,
    attendees,
    initialCapacityExceedsNeed
  )

  // if all the checkboxes should be preselected
  const isAllPreselected = initialCapacityExceedsNeed && !initialWaitIds?.length

  // initialize the store state for group booking
  const [ initialized, setInitialized ] = useState(false)
  useEffect(() => {
    setSessionCapacity(remainingCount)

    setBookingList(initialBookedIds)
    setWaitingList(initialWaitIds)
    //TODO: shouldn't set this to empty array, b/c that's not strictly true -- we should just
    // return more arrays from `useBookingList`: the preselected ones, but also the array
    // without preselection since THAT is the initial booking list
    setInitialBookingList(isAllPreselected ? [] : initialBookedIds)
    setInitialWaitingList(initialWaitIds)

    setCurrentSessionId(session?.identifier)
    setInitialized(true)
  }, [session])

  return initialized
}
