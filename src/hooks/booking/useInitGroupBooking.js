import { useState, useEffect } from 'react'
import { useBookingLists } from './useBookingLists'
import {
  setWaitingList,
  setBookingList,
  setInitialWaitingList,
  setInitialBookingList,
  setSessionCapacity,
  setCurrentSessionId,
  setConsumerModifiedBooking,
} from 'SVActions/session/booking'

/**
 * Initializes the store items related to the group booking UI
 * @param {import('SVModels/session').Session} session - current session to be considered for group booking
 * @param {Array<import('SVModels/attendee').Attendee>} attendees - list of attendees
 * @param {boolean} initialCapacityExceedsNeed - if true, then the session has greater capacity than the number of bookable attendees
 * @param {number} remainingCount - remaining count of the session capacity
 * @returns {boolean} true if the store is initialized with the data, false otherwise
 */
export const useInitGroupBooking = (
  session,
  attendees,
  initialCapacityExceedsNeed,
  remainingCount
) => {
  const [ currentBookedIds, currentWaitIds, existingBookedIds ] = useBookingLists(
    session,
    attendees,
    initialCapacityExceedsNeed
  )

  // if all the checkboxes should be preselected
  const isAllPreselected = initialCapacityExceedsNeed && !currentWaitIds?.length

  // initialize the store state for group booking
  const [ initialized, setInitialized ] = useState(false)
  useEffect(() => {
    setSessionCapacity(remainingCount)

    setBookingList(currentBookedIds)
    setWaitingList(currentWaitIds)

    // if the booked ids list contains preselected attendees, then the "initial"
    // list was actually the one without preselection
    // TODO: this is unintuitive as hell, find a better way to determine all of this
    setInitialBookingList(
      isAllPreselected ? existingBookedIds : currentBookedIds
    )
    setInitialWaitingList(currentWaitIds)

    // TODO: set this to the result of whether or not the consuemr modified it
    setConsumerModifiedBooking(false)

    setCurrentSessionId(session?.identifier)
    setInitialized(true)
  }, [session])

  return initialized
}

// TODO: I need to sync jsutils to get containsSameElement, then I need to call this before setting the lists in the useEffect
// above, andI need to hope it doesn't care about filtering the isBookable people
// - it shouldn't matter, b/c if user submitted the booking, they could only submit peeps that ARE bookable!
// const consumerModifiedBooking = () => {
//   return !containsSameElements(currentBookedIds, incomingBookedIds)
//     || !containsSameElements(currentWaitIds, incominingWaitIds)
// }
