import { Values } from 'SVConstants'
import { getEventEmitter } from 'SVUtils'

const { EVENTS } = Values
const kegEventEmitter = getEventEmitter()

/**
 * sessionBookingRequest
 */
export const sessionBookingRequest = (sessionId, attendeeIds = []) => {
  // TODO: incomplete until middle section is done
  // https://jira.simpleviewtools.com/browse/ZEN-278
  // 1. get selected attendee(s)
  // 2. return 2 things
  //     - session id (utilize activeSession state)
  //     - the attendee.EfBookedTicketIdentifier in an array
  const valid = kegEventEmitter.emit(
    EVENTS.SESSION_BOOKING_REQUEST,
    sessionId,
    attendeeIds
  )
  if (!valid)
    console.warn(
      `Callback for ${EVENTS.SESSION_BOOKING_REQUEST} does not exist!`
    )
  else
    console.log(
      'Emitted event',
      EVENTS.SESSION_BOOKING_REQUEST,
      sessionId,
      attendeeIds
    )
}
