/**
 * Attendee class model
 */
export class Attendee {
  /**
   * @param {Object?} props
   * @property {string=} bookedTicketIdentifier - booked ticket id
   * @property {string=} name - attendee's name
   * @property {string=} attendeeCategoryIdentifier - attendee category id
   * @property {Array<number>=} bookedDays - list of days booked
   * @property {Array<string>=} bookedSessions - list of sessions booked
   */
  constructor({
    bookedTicketIdentifier = '',
    name = '',
    attendeeCategoryIdentifier = '',
    bookedDays = [],
    bookedSessions = [],
  } = {}) {
    this.bookedTicketIdentifier = bookedTicketIdentifier
    this.name = name
    this.attendeeCategoryIdentifier = attendeeCategoryIdentifier
    this.bookedDays = bookedDays
    this.bookedSessions = bookedSessions
  }
}
