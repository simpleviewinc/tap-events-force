import { EVFIcons } from 'SVIcons'
import { Values } from 'SVConstants'
import { reduceObj, exists } from '@keg-hub/jsutils'
import { BookingState } from 'SVModels/session/bookingState'
import { getDisabled } from './getDisabled'

const { BookingCheck, Digit } = EVFIcons
const {
  SESSION_BOOKING_STATES,
  BOOKING_STATES_WITH_ICON,
  BOOKING_STATES_WITH_ALT_TEXT,
} = Values

/**
 * Gets the number to display on the button based on the booking type
 * @param {string} state - The current booking state of the session
 * @param {Array} bookingList - List of ids booked for this session
 * @param {Array} waitingList - List of ids on the waiting list for this session
 *
 * @returns {number} - Display Amount to show on the Digit Icon
 */
const getDisplayAmount = (state, bookingList, waitingList) => {
  return SESSION_BOOKING_STATES.ON_WAITING_LIST === state
    ? waitingList.length
    : bookingList.length
}

/**
 * Check if the state has alternate text, and use that instead of the default
 * Covers edge cases for read-only and fully booked
 * @param {string} key - Key of the booking state from Constants
 * @param {string} value - Value of the booking state from Constants
 *
 * @returns {string} - Display text of the booking state
 */
const getStateText = (key, value) => {
  return exists(BOOKING_STATES_WITH_ALT_TEXT[value])
    ? BOOKING_STATES_WITH_ALT_TEXT[value].replace(/_/g, ' ').toUpperCase()
    : key.replace(/_/g, ' ').toUpperCase()
}

/**
 * Set the Icon type based on the the booking type
 * Covers edge cases for read-only and fully booked
 * @param {string} bookingMode - The type of booking to check for (single | group)
 * @param {string} value - Value of the booking state from Constants
 *
 * @returns {Object} - Contains the icon if it exists for the booking state
 */
const getStateIcon = (bookingMode, value, bookingList, waitingList) => {
  const displayAmount = getDisplayAmount(value, bookingList, waitingList)

  return BOOKING_STATES_WITH_ICON[value]
    ? { displayAmount, icon: bookingMode === 'single' ? BookingCheck : Digit }
    : {}
}

/**
 * @param {Object} props
 * @returns {boolean} true if the props indicate the button should be
 * in a pending state
 */
const getPending = props => {
  const { pendingSession, session } = props
  return (
    pendingSession &&
    session &&
    pendingSession.identifier === session.identifier
  )
}

/**
 * Builds factory methods from the Booking State model
 * <br/>Is exported as an object of Booking States as keys, and a Booking State factory method as the value
 */
export const bookingStateFactory = reduceObj(
  // Loop the booking states, and create an object with the state as the key, and a function as the value
  SESSION_BOOKING_STATES,
  (key, state, mapped) => {
    mapped[state] = props => {
      const { session, bookingMode, bookingList, waitingList } = props

      // Create the new Booking state based on the passed in session, and current state
      return new BookingState({
        state,
        mode: bookingMode,
        sessionId: session.identifier,
        ...getStateIcon(bookingMode, state, bookingList, waitingList),
        text: getStateText(key, state) || false,
        disabled: getDisabled(props, state),
        pending: getPending(props),
        bookedCount: getDisplayAmount(state, bookingList, waitingList),
      })
    }

    return mapped
  }
)
