import { deepFreeze } from 'jsutils'
import { Values } from 'SVConstants'

/**
 * @typedef booking
 * @type {object}
 * @property {('person'|'group'|'undefined')} type
 * @property {Array.<import('./attendee').attendee>} users - array of users
 */
/** @type {booking} */
export const booking = deepFreeze({
  type: Values.bookingTypes.undefined,
  users: [],
})
