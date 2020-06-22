import { deepFreeze } from 'jsutils'

/**
 * Session booking item
 * @typedef booking
 * @type {object}
 * @property {('PERSON'|'GROUP')} type
 * @property {Array.<import('./attendee').attendee>} users - array of users
 */
/** @type {booking} */
export const booking = deepFreeze({
  type: null,
  users: [],
})
