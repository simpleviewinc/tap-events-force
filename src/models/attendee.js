import { deepFreeze } from 'jsutils'

/**
 * Attendee user
 * @typedef attendee
 * @type {object}
 * @property {string} bookedTicketIdentifier - booked ticket id
 * @property {string} name - attendee's name
 * @property {string} attendeeCategoryIdentifier - attendee category id
 * @property {number|string} bookedDays - list of days booked
 * @property {Array<string>} bookedSessions - list of sessions booked
 */
/** @type {attendee} */
export const attendee = deepFreeze({
  bookedTicketIdentifier: '',
  name: '',
  attendeeCategoryIdentifier: '',
  bookedDays: [],
  bookedSessions: [],
})
