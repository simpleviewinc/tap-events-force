import { EVFIcons } from 'SVIcons'
import { Values } from 'SVConstants'
import { reduceObj, exists } from '@keg-hub/jsutils'
import { BookingState } from 'SVModels/session/bookingState'

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
 * TODO: Sync with events force to have them pass an option for bookingStopped
 * Will need to update this method to pull that option based on how its passed in
 */
/**
 * Checks if the booking display should be disabled from interaction
 * @param {import('SVModels/session').Session} props.session
 *
 * @returns {boolean} - If booking changes have been stopped for this session
 */
const getBookingStopped = session => {
  return session.bookingStopped
}

/**
 * Checks if the booking display should be disabled from interaction
 * @param {import('SVModels/session').Session} props.session
 * @param {boolean} bookingStopped - If booking changes have been stopped for this session
 *
 * @returns {boolean} - If the display interaction should be disabled
 */
const getDisabled = (
  { session, pendingSession, bookableCount, bookingMode, timeConflicts },
  state
) => {
  // if there is a different session awaiting the booking request result, all others are disabled
  if (
    pendingSession?.identifier &&
    pendingSession.identifier !== session.identifier
  )
    return true

  // If state is select, and in single booking mode and there's a time conflict
  // Then the booking state should be disabled
  if (
    state === SESSION_BOOKING_STATES.SELECT &&
    bookingMode === 'single' &&
    timeConflicts
  )
    return true

  const { capacity, allowBooking } = session

  const bookingStopped = getBookingStopped(session)
  const noCapacity =
    !bookableCount ||
    (!capacity?.remainingPlaces && !capacity?.isWaitingListAvailable)

  return capacity?.isUnlimited
    ? false
    : !allowBooking || bookingStopped || noCapacity
        ? true
        : false
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
      })
    }

    return mapped
  }
)
