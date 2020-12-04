import { useCallback } from 'react'
import { handleBookingRequests } from 'SVActions/session/booking/handleBookingRequests'
import { Values } from 'SVConstants'
import { useKegEvent } from 'SVHooks/events'

const {
  EVENTS: { SESSION_BOOKING_REQUEST },
} = Values

/**
 * Registers the request callbacks to the session booking request event, but
 * first wraps the callbacks to handle setting the associated session to pending,
 * resetting that status upon resolving the promise, and catching
 * any errors that might arise so to display the alert modal.
 * @param {Function<Promise>} bookRequestCb - an async function for booked-list request
 * @param {Function<Promise>} waitRequestCb - an async function for wait-list request
 * @return {void}
 */
export const useBookingRequestEvent = (bookRequestCb, waitRequestCb) => {
  const handler = useCallback(
    (sessionId, bookList, waitList) => {
      const bookRequest = () => bookList && bookRequestCb(sessionId, bookList)
      const waitRequest = () => waitList && waitRequestCb(sessionId, waitList)
      handleBookingRequests(bookRequest, waitRequest, sessionId)
    },
    [ bookRequestCb, waitRequestCb ]
  )

  useKegEvent(SESSION_BOOKING_REQUEST, handler)
}
