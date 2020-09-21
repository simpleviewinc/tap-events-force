import { useRef, useState, useCallback } from 'react'
import { sessionBookingRequest, sessionWaitingListRequest } from 'SVActions'

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

  // A set of attendee ids for attendees to be booked to the session.
  const attendeeIdsToBook = useRef(new Set(initialBookedIds || undefined))
  const attendeeIdsToWait = useRef(new Set(initialWaitIds || undefined))

  // updates the currentCapacity, as well as the correct ids list
  const updateCapacity = useCallback(
    ({ id }) => {
      // const shouldUseWaitingList = waitingListIsAvailable && currentCapacity <= 0
      // if (shouldUseWaitingList) {
      //   attendeeIdsToWait.current.has(id)
      //     ? attendeeIdsToWait.current.delete(id)
      //     : attendeeIdsToWait.current.add(id)
      // }
      if (attendeeIdsToBook.current.has(id)) {
        alert(`${id} exists`)
        const deleted = attendeeIdsToBook.current.delete(id)
        deleted && !isUnlimited && setCapacity(currentCapacity + 1)
      }
      else {
        alert(`${id} doesn\'t exist`)
        const added = attendeeIdsToBook.current.add(id)
        added && !isUnlimited && setCapacity(currentCapacity - 1)
      }
    },
    [ attendeeIdsToBook, currentCapacity, setCapacity, isUnlimited ]
  )

  // makes a request to book the session for the selected attendees (as identified by ids in `attendeeIdsRef`)
  const bookSession = useCallback(
    () =>
      sessionBookingRequest(
        session.identifier,
        Array.from(attendeeIdsToBook.current)
      ),
    waitingListIsAvailable &&
      sessionWaitingListRequest?.(
        session.identifier,
        Array.from(attendeeIdsToWait.current)
      )[(session.identifier, attendeeIdsToBook)]
  )

  const isAttendeeBooking = useCallback(
    id => attendeeIdsToBook.current.has(id),
    [attendeeIdsToBook.current]
  )

  const isAttendeeWaiting = useCallback(
    id => attendeeIdsToWait.current.has(id),
    [attendeeIdsToWait.current]
  )

  return {
    updateCapacity,
    bookSession,
    isAttendeeBooking,
    isAttendeeWaiting,
    currentCapacity,
  }
}
