import { Values } from 'SVConstants'
import { getEventEmitter } from 'SVUtils/events'
import { validateEventResponse } from 'SVUtils/validation'
import { validate, isStr } from '@keg-hub/jsutils'
import { isValidBookingList } from 'SVUtils/booking/isValidBookingList'

const { EVENTS } = Values
const kegEventEmitter = getEventEmitter()

/**
 * Emits the session booking request event, calling any listeners to that event
 * and passing `sessionId` and `attendeeIds` to them.
 *
 * The consuming app of the sessions-component can define one of these sessionBookingRequest listeners.
 *
 * @param {string} sessionId - the id of the session that has attendees to book
 * @param {Array<string>} bookList - list of attendee ids to be booked to this session
 * @param {Array<string>} waitList - list of attendee ids to be put on the waiting list for this session
 * @return {void}
 */
export const sessionBookingRequest = (sessionId, bookList, waitList) => {
  const [valid] = validate(
    { sessionId, bookList, waitList },
    { sessionId: isStr, $default: isValidBookingList }
  )
  if (!valid) return

  const validEvent = kegEventEmitter.emit(
    EVENTS.SESSION_BOOKING_REQUEST,
    sessionId,
    bookList,
    waitList
  )

  validateEventResponse(
    validEvent,
    [`Callback for ${EVENTS.SESSION_BOOKING_REQUEST} does not exist!`],
    [
      'Emitted event',
      EVENTS.SESSION_BOOKING_REQUEST,
      sessionId,
      { bookList, waitList },
    ]
  )
}
