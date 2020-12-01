import { useCallback, useContext } from 'react'
import { handleAttendeeRequest } from 'SVActions/session/booking/handleAttendeeRequest'
import { Values } from 'SVConstants'
import { useKegEvent } from 'SVHooks/events'
import { ModalContext } from 'SVContexts/modals/modalContext'

const {
  EVENTS: { SESSION_BOOKING_REQUEST },
} = Values

/**
 * Registers the request callback to the session booking request event, but
 * first wraps the callbacks to handle setting the associated session to pending,
 * resetting that status upon resolving the promise, and catching
 * any errors that might arise so to display the alert modal.
 * @param {Function<Promise>} bookRequestCb - an async function for booked-list request
 * @param {Function<Promise>} waitRequestCb - an async function for wait-list request
 * @param {Function} onSuccess - function that executes if request is successful
 * @return {void}
 */
export const useBookingRequestEvent = (bookRequestCb, waitRequestCb) => {
  // get the close modal callback so that we can close the visible modal (group booker)
  // if the request is successful
  const { closeActiveModal } = useContext(ModalContext)

  const handler = useCallback(
    (sessionId, bookList, waitList) => {
      const bookRequest = bookList && bookRequestCb(sessionId, bookList)
      const waitRequest = waitList && waitRequestCb(sessionId, waitList)
      handleAttendeeRequest(
        bookRequest,
        waitRequest,
        closeActiveModal,
        sessionId
      )
    },
    [ bookRequestCb, waitRequestCb, closeActiveModal ]
  )

  useKegEvent(SESSION_BOOKING_REQUEST, handler)
}
