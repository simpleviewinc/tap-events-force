import { deepFreeze } from 'jsutils'

/**
 * activeSession object
 * @typedef activeSession
 * @type {object}
 * @property {number|string} id - id of session
 * @property {boolean} open - is it opened? Used on mobile
 * @property {string} bookingState - booking state of the user
 */
/** @type {activeSession} */
export const activeSession = deepFreeze({
  id: 0,
  open: false,
  bookingState: null,
})
