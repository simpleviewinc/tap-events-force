import { Values } from 'SVConstants'
import { getEventEmitter } from 'SVUtils'

const { EVENT_LISTENERS } = Values

/**
 * GroupBookingSubmit
 * action for the group booking modal, when user clicks the submit button
 */
export const groupBookingSubmit = () => {
  // TODO: incomplete until middle section is done
  // https://jira.simpleviewtools.com/browse/ZEN-278
  getEventEmitter().emit(
    EVENT_LISTENERS.GROUP_BOOKING_SUBMIT,
    'placeholderData'
  )
}
