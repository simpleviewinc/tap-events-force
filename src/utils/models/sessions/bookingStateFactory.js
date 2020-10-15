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
 * Builds factory methods from the Booking State model
 * <br/>Is exported as an object of Booking States as keys, and a Booking State factory method as the value
 */
export const bookingStateFactory = reduceObj(
  // Loop the booking states, and create an object with the state as the key, and a function as the value
  SESSION_BOOKING_STATES,
  (key, value, mapped) => {
    mapped[value] = (session, bookingType, theme, disabled) => {
      // Check if the state has alternate text, and use that instead of the default
      // Covers edge cases for read-only and fully booked
      const text = exists(BOOKING_STATES_WITH_ALT_TEXT[value])
        ? BOOKING_STATES_WITH_ALT_TEXT[value].replace(/_/g, ' ')
        : key.replace(/_/g, ' ')

      // Create the new Booking state based on the passed in session, and current state
      return new BookingState({
        disabled,
        state: value,
        text: text || false,
        sessionId: session.identifier,
        styles: theme?.button?.evfButton[value],
        // Set the Icon type based on the the booking type
        ...(BOOKING_STATES_WITH_ICON[value] && {
          icon: bookingType === 'single' ? BookingCheck : Digit,
        }),
      })
    }

    return mapped
  }
)
