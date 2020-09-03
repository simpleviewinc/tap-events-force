import { Values } from 'SVConstants'
import { getEventEmitter } from 'SVUtils'

const { EVENT_LISTENERS } = Values

/**
 * sessionBookingRequest
 */
export const sessionBookingRequest = () => {
  // TODO: incomplete until middle section is done
  // https://jira.simpleviewtools.com/browse/ZEN-278
  // 1. get selected attendee(s)
  // 2. return 2 things
  //     - session id (utilize activeSession state)
  //     - the attendee.EfBookedTicketIdentifier in an array
  const valid = getEventEmitter().emit(
    EVENT_LISTENERS.SESSION_BOOKING_REQUEST,
    'exampleSessionId',
    [ 'attendeId2', 'attendeId3' ]
  )
  if (!valid)
    console.warn(
      `Callback for ${EVENT_LISTENERS.SESSION_BOOKING_REQUEST} does not exist!`
    )
}
