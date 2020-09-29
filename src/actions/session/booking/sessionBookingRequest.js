import { Values } from 'SVConstants'
import { getEventEmitter } from 'SVUtils'

const { EVENTS } = Values
const kegEventEmitter = getEventEmitter()

/**
 * sessionBookingRequest
 */
export const sessionBookingRequest = (sessionId, attendeeIds = []) => {
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
