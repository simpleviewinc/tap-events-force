/**
 * Booking class model
 */
export class Booking {
  /**
   * @param {Object?} props
   * @property {('PERSON'|'GROUP'| null)} type
   * @property {Array.<import('./attendee').Attendee>} users - array of users
   */
  constructor({ type = null, users = [] } = {}) {
    this.type = type
    this.users = users
  }
}
