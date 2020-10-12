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
const { CATEGORIES, SUB_CATEGORIES } = Values

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
 * Returns true if arrays A & B contain all the same elements,
 * where order doesn't matter
 * @param {Array<*>} arrA
 * @param {Array<*>} arrB
 */
const containSameElements = (arrA, arrB) => {
  if (arrA.length !== arrB.length) return false
  if (arrA.length === 0) return true
  const setA = new Set(arrA)
  return arrB.every(item => setA.has(item))
}

/**
 * Returns callbacks for working with session capacity and latest capacity
 * @param {number?} initialCapacity
 * @param {import('SVModels/session').Session} session
 * @param {Array<import('SVModels/attendee').Attendee>} session
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

  const initialBookingList = useStoreItems(
    `${CATEGORIES.GROUP_BOOKING}.${SUB_CATEGORIES.INITIAL_BOOKING_LIST}`
  )
  const initialWaitingList = useStoreItems(
    `${CATEGORIES.GROUP_BOOKING}.${SUB_CATEGORIES.INITIAL_WAITING_LIST}`
  )

  const userHasModifiedBooking = !(
    containSameElements(bookingSet.data, initialBookingList) &&
    containSameElements(waitingSet.data, initialWaitingList)
  )

  const updateCapacity = useUpdateSessionLists(
    waitingSet,
    bookingSet,
    waitingListIsAvailable,
    currentCapacity,
    isUnlimited
  )

  const bookSessionCb = useBookSession(session, bookingSet, waitingSet)

  return {
    updateCapacity,
    currentCapacity,

    // if user has modified booking or waiting list, then we need to call the book session cb.
    // otherwise, do nothing
    bookSession: userHasModifiedBooking ? bookSessionCb : null,
  }
}
