/**
 * Attendee class model
 */
export class Attendee {
  /**
   * @param {string=} bookedTicketIdentifier - booked ticket id
   * @param {string=} name - attendee's name
   * @param {string=} attendeeCategoryIdentifier - attendee category id
   * @param {Array<number>=} bookedDays - list of days booked
   * @param {Array<string>=} bookedSessions - list of sessions booked
   */
  constructor(
    bookedTicketIdentifier = '',
    name = '',
    attendeeCategoryIdentifier = '',
    bookedDays = [],
    bookedSessions = []
  ) {
    this.bookedTicketIdentifier = bookedTicketIdentifier
    this.name = name
    this.attendeeCategoryIdentifier = attendeeCategoryIdentifier
    this.bookedDays = bookedDays
    this.bookedSessions = bookedSessions
  }
}
