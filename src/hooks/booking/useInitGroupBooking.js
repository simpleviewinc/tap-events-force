import { useState, useEffect } from 'react'
import { useBookingLists } from './useBookingLists'
import {
  setWaitingList,
  setBookingList,
  setSessionCapacity,
  setCurrentSessionId,
} from 'SVActions/session/booking'

/**
 * Initializes the store items related to the group booking UI
 * @param {import('SVModels/session').Session} session - current session to be considered for group booking
 * @param {Array<import('SVModels/attendee').Attendee>} attendees - list of attendees
 * @param {Function<string, boolean>} isBookable - function accepting attendee id, returning true if it can be booked against the current session
 * @param {boolean} initialCapacityExceedsNeed - if true, then the session has greater capacity than the number of bookable attendees
 * @returns {boolean} true if the store is initialized with the data, false otherwise
 */
export const useInitGroupBooking = (
  session,
  attendees,
  isBookable,
  initialCapacityExceedsNeed,
  remainingCount
) => {
  const [ initialBookedIds, initialWaitIds ] = useBookingLists(
    session,
    attendees,
    isBookable,
    initialCapacityExceedsNeed,
    session?.capacity?.isWaitingListAvailable
  )

  // initialize the store state for group booking
  const [ initialized, setInitialized ] = useState(false)
  useEffect(() => {
    setSessionCapacity(remainingCount)
    setBookingList(initialBookedIds)
    setWaitingList(initialWaitIds)
    setCurrentSessionId(session?.identifier)
    setInitialized(true)
  }, [session])

  return initialized
}
