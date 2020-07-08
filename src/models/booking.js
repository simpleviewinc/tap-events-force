import { assignDefinedProps } from 'SVUtils'
/**
 * Booking class model
 */
export class Booking {
  type = null
  users = []

  /**
   * @param {object} params
   * @param {('person'|'group'| null)} params.type
   * @param {Array.<import('./attendee').Attendee>} params.users - array of users
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
