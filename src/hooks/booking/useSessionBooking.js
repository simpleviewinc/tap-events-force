import { useCallback } from 'react'
import {
  sessionBookingRequest,
  sessionWaitingListRequest,
  setSessionCapacity as setCapacity,
} from 'SVActions/session/booking'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useBookingSet } from './useBookingSet'
import { useWaitingSet } from './useWaitingSet'
import { addAlertModal } from 'SVActions/modals/addAlertModal'
import { Values } from 'SVConstants'
import { setPendingSession } from 'SVActions/session/pending/setPendingSession'
import { clearPendingSession } from 'SVActions/session/pending/clearPendingSession'
const { CATEGORIES } = Values

/**
 * Returns a callback that, given an attendee id, updates the list
 * (either adding to or removing from the attendees booking list or attendees waiting list)
 * in addition to updating the session's current capacity
 * @param {Object} waitingList - set-like interface to the attendee waiting list. mutations should cause store dispatches
 * @param {Object} bookingList - set-like interface to the attendee booking list. mutations should cause store dispatches
 * @param {boolean} waitingListIsAvailable - true if the session allows waitingLists
 * @param {number} currentCapacity - current capacity of the session in the group booking context
 * @param {boolean} isUnlimited - true if the session has an unlimited capacity in its booking list
 * @returns {Function} - callback of form: id => updateListWithId(id)
 */
const useUpdateSessionListsCallback = (
  waitingList,
  bookingList,
  waitingListIsAvailable,
  currentCapacity,
  isUnlimited
) => {
  // updates the currentCapacity, as well as the correct ids list
  return useCallback(
    ({ id }) => {
      const shouldUseWaitingList =
        waitingListIsAvailable && currentCapacity <= 0
      if (waitingList.has(id)) {
        waitingList.delete(id)
      }
      else if (bookingList.has(id)) {
        bookingList.delete(id) &&
          !isUnlimited &&
          setCapacity(currentCapacity + 1)
      }
      else if (shouldUseWaitingList && !waitingList.has(id)) {
        waitingList.add(id)
      }
      else if (!shouldUseWaitingList && !bookingList.has(id)) {
        bookingList.add(id) && !isUnlimited && setCapacity(currentCapacity - 1)
      }
    },
    [
      waitingList,
      bookingList,
      waitingListIsAvailable,
      currentCapacity,
      isUnlimited,
    ]
  )
}

/**
 *
 * @param {string} sessionId
 * @param {Array<string>} bookList
 * @param {boolean} waitListIsAvailable
 * @param {Array<string>} waitList
 */
const handleAsyncBooking = async (sessionId, bookList, waitList) => {
  try {
    setPendingSession(sessionId)
    return await Promise.all([
      sessionBookingRequest(sessionId, bookList),
      waitList && sessionWaitingListRequest(sessionId, waitList),
    ])
  }
  catch (error) {
    addAlertModal(error.name || 'Booking Request Failed', error.message)
  }
  finally {
    clearPendingSession()
  }
}

/**
 * Returns a callback that, given an attendee id, updates the list
 * (either adding to or removing from the attendees booking list or attendees waiting list)
 * in addition to updating the session's current capacity
 * @param {Object} session - current session to book attendees with
 * @param {Object} waitSet - set-like interface to the attendee waiting list. mutations cause store dispatches
 * @param {Object} bookingSet - set-like interface to the attendee booking list. mutations cause store dispatches
 * @returns {Function} - callback that will submit the current booking and waiting lists to the consumer
 */
const useBookSessionCallback = (session, bookingSet, waitSet) => {
  const waitListIsAvailable = session?.capacity?.isWaitingListAvailable
  const sessionId = session?.identifier

  const bookingArr = Array.from(bookingSet.data)
  const waitingArr = waitSet && waitListIsAvailable && Array.from(waitSet.data)

  // makes a request to book the session for the selected attendees (as identified by ids in `attendeeIdsRef`)
  return useCallback(
    async () => handleAsyncBooking(sessionId, bookingArr, waitingArr),
    [ sessionId, bookingSet, waitListIsAvailable, waitSet ]
  )
}

/**
 * Returns callbacks for working with session capacity and latest capacity
 * @param {import('SVModels/session').Session} session
 * @return {Object} object with keys for callbacks and current capacity
 *  - updateCapacity: callback of form: id => updateListWithId(id)
 *  - bookSession: callback that books the session with the current booking list and waiting list
 *  - currentCapacity - the current capacity of the session, that may have been changed by selecting/unselecting attendeese in the group booking modal
 */
export const useSessionBooking = session => {
  const currentCapacity = useStoreItems(`${CATEGORIES.GROUP_BOOKING}.capacity`)
  const waitingListIsAvailable = session?.capacity?.isWaitingListAvailable
  const isUnlimited = session?.capacity?.isUnlimited

  // sets of attendee ids for booking and waiting
  const bookingSet = useBookingSet()
  const waitingSet = useWaitingSet()

  const updateCapacity = useUpdateSessionListsCallback(
    waitingSet,
    bookingSet,
    waitingListIsAvailable,
    currentCapacity,
    isUnlimited
  )

  const bookSession = useBookSessionCallback(session, bookingSet, waitingSet)

  return {
    updateCapacity,
    currentCapacity,
    bookSession,
  }
}
