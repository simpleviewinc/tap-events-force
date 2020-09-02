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
  // 2. return the attendees array
  const valid = getEventEmitter().emit(
    EVENT_LISTENERS.SESSION_BOOKING_REQUEST,
    [ 'attendee1', 'attendee2' ]
  )
  if (!valid)
    console.warn(
      `Callback for ${EVENT_LISTENERS.SESSION_BOOKING_REQUEST} does not exist!`
    )
}
