import { useCallback } from 'react'
import {
  sessionBookingRequest,
  sessionWaitingListRequest,
  setSessionCapacity as setCapacity,
} from 'SVActions/session/booking'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useBookingSet } from './useBookingSet'
import { useWaitingSet } from './useWaitingSet'
import { Values } from 'SVConstants'
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
const useUpdateSessionLists = (
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
        console.log('WL deleting', id)
        waitingList.delete(id)
      }
      else if (bookingList.has(id)) {
        console.log('BL deleting', id)
        bookingList.delete(id) &&
          !isUnlimited &&
          setCapacity(currentCapacity + 1)
      }
      else if (shouldUseWaitingList && !waitingList.has(id)) {
        console.log('WL adding', id)
        waitingList.add(id)
      }
      else if (!shouldUseWaitingList && !bookingList.has(id)) {
        console.log('BL adding', id)
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
 * Returns a callback that, given an attendee id, updates the list
 * (either adding to or removing from the attendees booking list or attendees waiting list)
 * in addition to updating the session's current capacity
 * @param {Object} session - current session to book attendees with
 * @param {Object} waitingList - set-like interface to the attendee waiting list. mutations cause store dispatches
 * @param {Object} bookingList - set-like interface to the attendee booking list. mutations cause store dispatches
 * @returns {Function} - callback that will submit the current booking and waiting lists to the consumer
 */
const useBookSession = (session, bookingList, waitingList) => {
  const waitingListIsAvailable = session?.capacity?.isWaitingListAvailable
  // makes a request to book the session for the selected attendees (as identified by ids in `attendeeIdsRef`)
  return useCallback(() => {
    sessionBookingRequest(session.identifier, Array.from(bookingList.data))
    waitingListIsAvailable &&
      sessionWaitingListRequest(
        session.identifier,
        Array.from(waitingList.data)
      )
  }, [ session.identifier, bookingList, waitingListIsAvailable, waitingList ])
}

/**
 * Returns callbacks for working with session capacity and latest capacity
 * @param {number?} initialCapacity
 * @param {*} session
 */
export const useSessionBooking = session => {
  const currentCapacity = useStoreItems(`${CATEGORIES.GROUP_BOOKING}.capacity`)
  const waitingListIsAvailable = session?.capacity?.isWaitingListAvailable
  const isUnlimited = session?.capacity?.isUnlimited

  // sets of attendee ids for booking and waiting
  const bookingList = useBookingSet()
  const waitingList = useWaitingSet()

  const updateCapacity = useUpdateSessionLists(
    waitingList,
    bookingList,
    waitingListIsAvailable,
    currentCapacity,
    isUnlimited
  )

  const bookSession = useBookSession(session, bookingList, waitingList)

  return {
    updateCapacity,
    bookSession,
    currentCapacity,
  }
}
