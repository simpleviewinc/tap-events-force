import { useState, useEffect, useRef } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useBookingLists } from './useBookingLists'
import {
  setWaitingList,
  setBookingList,
  setSessionCapacity,
  setCurrentSessionId,
  setUserModifiedBooking,
} from 'SVActions/session/booking'
import { areSetEqual } from '@keg-hub/jsutils'

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
  const [
    initialBookedIds,
    initialWaitIds,
    bookedIdsFromProps,
    waitIdsFromProps,
  ] = useBookingLists(session, attendees, initialCapacityExceedsNeed)

  // initialize the store state for group booking
  const [ initialized, setInitialized ] = useState(false)

  useEffect(() => {
    setSessionCapacity(remainingCount)
    setBookingList(initialBookedIds)
    setWaitingList(initialWaitIds)
    setCurrentSessionId(session?.identifier)
    setInitialized(true)
  }, [session])

  // set up a hook to wait for changes to the lists,
  // then compare them to the initial lists. If a modification
  // was made, then update the isModified store value
  useBookingModifyMonitor(
    session?.identifier,
    waitIdsFromProps,
    bookedIdsFromProps
  )

  return initialized
}

/**
 * Monitors the current waiting and booking lists for the group booking modal,
 * and sets the `groupBooking.isModified` value based on if at least one of the lists
 * differs from its starting state.
 * @param {Array<string>} initialWaitIds - starting state of wait list in group booking modal, before any selection
 * @param {Array<string>} initialBookedIds - starting state of book list in group booking modal, before any selection
 */
const useBookingModifyMonitor = (
  sessionId,
  initialWaitIds = [],
  initialBookedIds = []
) => {
  // set the initial booking lists. Only runs when the group booking modal is opened.
  // If it is closed and reopened (remounted), the ref will be reset with latest.
  const { current: origWaitList } = useRef(initialWaitIds)
  const { current: origBookList } = useRef(initialBookedIds)

  const {
    groupBookingWaitingList: waitList,
    groupBookingBookingList: bookList,
  } = useStoreItems([ 'groupBooking.waitingList', 'groupBooking.bookingList' ])

  useEffect(() => {
    const waitListModified = !areSetEqual(waitList, origWaitList)
    const bookListModified = !areSetEqual(bookList, origBookList)
    setUserModifiedBooking(sessionId, waitListModified, bookListModified)
  }, [ sessionId, waitList, bookList ])
}
