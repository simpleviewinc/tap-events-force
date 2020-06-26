/**
 * Booking class model
 */
export class Booking {
  /**
   * @param {('PERSON'|'GROUP'| null)} type
   * @param {Array.<import('./attendee').Attendee>} users - array of users
   */
  constructor(type = null, users = []) {
    this.type = type
    this.users = users
  }
}
