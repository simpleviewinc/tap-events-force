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
 * @param {*} session
 * @param {*} attendees
 * @param {*} isBookable
 * @param {*} initialCapacityExceedsNeed
 * @returns {boolean} true if the store is initialized with the data, false otherwise
 */
export const useInitGroupBooking = (
  session,
  attendees,
  isBookable,
  initialCapacityExceedsNeed,
  remainingCount
) => {
  // can go in init hook
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
