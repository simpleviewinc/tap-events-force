import { deepFreeze } from 'jsutils'
import { Values } from 'SVConstants'

/**
 * Session booking item
 * @typedef booking
 * @type {object}
 * @property {('PERSON'|'GROUP'|'UNDEFINED')} type
 * @property {Array.<import('./attendee').attendee>} users - array of users
 */
/** @type {booking} */
export const booking = deepFreeze({
  type: Values.BOOKING_TYPES.UNDEFINED,
  users: [],
})
