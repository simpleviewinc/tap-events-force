import { Values } from 'SVConstants'
import { getEventEmitter } from 'SVUtils/events'
import { validateEventResponse } from 'SVUtils/validation'
import { setPendingSession } from './setPendingSession'

const { EVENTS } = Values
const kegEventEmitter = getEventEmitter()

/**
 * Emits the session booking request event, calling any listeners to that event
 * and passing `sessionId` and `attendeeIds` to them.
 *
 * The consuming app of the sessions-component can define one of these sessionBookingRequest listeners.
 *
 * @param {string} sessionId - the id of the session that has attendees to book
 * @param {Array<string>} attendeeIds - list of attendee ids to be booked to this session
 * @return {void}
 */
export const sessionBookingRequest = (sessionId, attendeeIds = []) => {
  const valid = kegEventEmitter.emit(
    EVENTS.SESSION_BOOKING_REQUEST,
    sessionId,
    attendeeIds
  )

  validateEventResponse(
    valid,
    [`Callback for ${EVENTS.SESSION_BOOKING_REQUEST} does not exist!`],
    [ 'Emitted event', EVENTS.SESSION_BOOKING_REQUEST, sessionId, attendeeIds ]
  )

  valid &&
    setPendingSession(sessionId, true, { pendingBookingList: attendeeIds })
}
