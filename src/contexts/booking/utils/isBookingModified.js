import { isObj, validate } from '@keg-hub/jsutils'

/**
 * @param {Object} state - group booker context state
 * @return {boolean} true if the booking list and/or waiting list are modified
 */
export const isBookingModified = state => {
  const [valid] = validate(
    { state, modified: state?.modified },
    { $default: isObj }
  )
  if (!valid) return false

  const {
    modified: { bookingList, waitingList },
  } = state

  return bookingList || waitingList
}
