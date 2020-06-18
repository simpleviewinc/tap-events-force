import { deepFreeze } from 'jsutils'

/**
 * Session object
 * @typedef session
 * @type {object}
 * @property {number|string} id - id of session
 * @property {boolean} open - is it opened? Used on mobile
 * @property {string} bookingState - booking state of the user
 */
/** @type {session} */
export const session = deepFreeze({
  id: 0,
  open: false,
  bookingState: null,
})
