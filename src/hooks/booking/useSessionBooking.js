import { useState, useCallback, useRef, useMemo } from 'react'
import {
  sessionBookingRequest,
  sessionWaitingListRequest,
  setWaitingList,
  setBookingList,
  setSessionCapacity as setCapacity,
} from 'SVActions/session/booking'

import { useStoreItems } from 'SVHooks/store/useStoreItems'

import { omitRange, uniqArr, pipeline } from '@keg-hub/jsutils'

import { Values } from 'SVConstants'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Stores elements as react state, while also ensuring no duplicates.
 * Returns a set-like object
 * @param {*} initialData
 * @return {Object} set-like object, with methods `add`, `has`, `delete`. To access the underlying
 * data, use the `data` property (which returns an array). Calling one of the mutation functions, add or delete,
 * **may** initiate a react state update, rerendering any components depending on `data`.
 * No state updates are queued if you try to add an element that already exists or delete an element that doesn't.
 *
 * @example
 * const initialUsers = [ { name: 'Steve' } ]
 * const users = useSet(initialUsers)
 * users.data // [ { name: 'Steve' } ]
 * users.has(initialUsers[0]) // true
 * users.delete(initialUsers[0]) // true
 * users.data // rerenders with []
 * users.add({ name: 'Bob' }) // true
 * users.add({ name: 'Bob' }) // false
 * users.data // rerenders with [{ name: 'Bob' }]
 */
export const useSet = (initialData = []) => {
  const set = useRef(new Set(initialData))
  const [ data, setData ] = useState(initialData)

  return useMemo(
    () => ({
      data,
      add: element => {
        if (set.current.has(element)) return false
        setData([ ...data, element ])
        return set.current.add(element)
      },
      has: element => set.current.has(element),
      delete: element => {
        if (!set.current.has(element)) return false
        const index = data.indexOf(element)
        // remove only the element at the index
        setData(data.filter((_, idx) => idx !== index))
        return set.current.delete(element)
      },
    }),
    [ data, setData, set.current ]
  )
}

// TODO: move to jsutils
/**
 * Returns a new array containing all the elements of `array`, excpet for `element`
 * @param {*} array
 * @param {*} element
 */
const omitElement = (array, element) => {
  const index = array?.indexOf(element) ?? -1
  return index < 0 ? array : omitRange(array, index, 1)
}

/**
 * Provides a set-like interface to `arr`.
 * If it determines a mutation needs to occur, it will call `setArr` with
 * the a new array that has the mutation applied.
 * @param {Array} arr
 * @param {Function} setArr
 */
export const useExternalSet = (arr, setArr) => {
  return useMemo(
    () => ({
      data: arr,
      add: element => {
        if (!arr || arr.includes(element)) return false
        pipeline([ ...arr, element ], uniqArr, setArr)
        return true
      },
      delete: element => {
        if (!arr?.includes(element)) return false
        pipeline(omitElement(arr, element), setArr)
        return true
      },
      has: element => arr?.includes(element),
    }),
    [ arr, setArr ]
  )
}

export const useBookingSet = () => {
  const groupBooking = useStoreItems(CATEGORIES.GROUP_BOOKING)
  return useExternalSet(groupBooking.bookingList, setBookingList)
}

export const useWaitingSet = () => {
  const groupBooking = useStoreItems(CATEGORIES.GROUP_BOOKING)
  return useExternalSet(groupBooking.waitingList, setWaitingList)
}

export const useCurrentSession = () => {
  const id = useStoreItems(
    `${CATEGORIES.GROUP_BOOKING}.${SUB_CATEGORIES.CURRENT_SESSION}`
  )
  return useStoreItems(`${CATEGORIES.SESSIONS}.${id}`)
}

/**
 * Returns callbacks for working with session capacity and latest capacity
 * @param {number?} initialCapacity
 * @param {*} session
 */
export const useSessionBooking = session => {
  const groupBooking = useStoreItems(CATEGORIES.GROUP_BOOKING)
  const currentCapacity = groupBooking?.capacity

  const waitingListIsAvailable = session?.capacity?.isWaitingListAvailable
  const isUnlimited = session?.capacity?.isUnlimited

  // sets of attendee ids for booking and waiting
  const bookingList = useExternalSet(groupBooking.bookingList, setBookingList)
  const waitingList = useExternalSet(groupBooking.waitingList, setWaitingList)

  // updates the currentCapacity, as well as the correct ids list
  const updateCapacity = useCallback(
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
    [ bookingList, waitingList, currentCapacity, setCapacity, isUnlimited ]
  )

  // makes a request to book the session for the selected attendees (as identified by ids in `attendeeIdsRef`)
  const bookSession = useCallback(() => {
    sessionBookingRequest(session.identifier, Array.from(bookingList.data))
    waitingListIsAvailable &&
      sessionWaitingListRequest(
        session.identifier,
        Array.from(waitingList.data)
      )
  }, [ session.identifier, bookingList, waitingListIsAvailable, waitingList ])

  return {
    updateCapacity,
    bookSession,
    attendeesBooking: bookingList,
    attendeesWaiting: waitingList,
    currentCapacity,
  }
}
