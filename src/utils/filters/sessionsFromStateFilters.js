import { getBookingState } from 'SVUtils/models/sessions/getBookingState'
import { Values } from 'SVConstants'

const { SESSION_BOOKING_STATES } = Values
const bookingStateKeys = Object.keys(SESSION_BOOKING_STATES)

/**
 * Filter by booking states
 * @param {Array.<import('SVModels/label').Label>} selectedFilters
 * @param {Array.<import('SVModels/session').Session>} sessions
 *
 * @returns {Array.<import('SVModels/session').Session>} - list filtered by button state or original list
 */
export const sessionsFromStateFilters = (selectedFilters, sessions) => {
  const hasStateFilters = selectedFilters.some(label =>
    bookingStateKeys.some(state => label.identifier === state)
  )
  return hasStateFilters
    ? sessions.filter(session =>
        selectedFilters.some(
          label => label.name.toLowerCase() === getBookingState(session)
        )
      )
    : sessions
}
