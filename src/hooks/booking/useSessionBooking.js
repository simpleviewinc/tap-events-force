import { useState, useCallback, useRef, useMemo } from 'react'
import {
  sessionBookingRequest,
  sessionWaitingListRequest,
} from 'SVActions/session/booking'

const useSet = (initialData = []) => {
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

/**
 * Returns callbacks for working with session capacity and latest capacity
 * @param {number?} initialCapacity
 * @param {*} session
 */
export const useSessionBooking = (
  initialCapacity,
  session,
  { initialBookedIds, initialWaitIds }
) => {
  // current remaining capacity of session, which updates as the user selects and unselects attendees for booking
  const [ currentCapacity, setCapacity ] = useState(initialCapacity ?? Infinity)

  const waitingListIsAvailable = session?.capacity?.isWaitingListAvailable
  const isUnlimited = session?.capacity?.isUnlimited

  // sets of attendee ids for booking and waiting
  const bookingList = useSet(initialBookedIds)
  const waitingList = useSet(initialWaitIds)

  // updates the currentCapacity, as well as the correct ids list
  const updateCapacity = useCallback(
    ({ id }) => {
      const shouldUseWaitingList =
        waitingListIsAvailable && currentCapacity <= 0
      if (waitingList.has(id)) {
        console.log('removing from waiting list', id)
        waitingList.delete(id)
      }
      else if (bookingList.has(id)) {
        console.log('removing from booking list', id)
        const deleted = bookingList.delete(id)
        deleted && !isUnlimited && setCapacity(currentCapacity + 1)
      }
      else if (shouldUseWaitingList && !waitingList.has(id)) {
        console.log('putting on waiting list', id)
        waitingList.add(id)
      }
      else if (!shouldUseWaitingList && !bookingList.has(id)) {
        console.log('putting on book list', id)
        const added = bookingList.add(id)
        added && !isUnlimited && setCapacity(currentCapacity - 1)
      }
      else {
        console.log('idk where to put', id)
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
