import { assignDefinedProps } from 'SVUtils'

export class Attendee {
  bookedTicketIdentifier = ''
  name = ''
  attendeeCategoryIdentifier = ''
  bookedDays = []
  bookedSessions = []

  /**
   * Attendee class model
   * @property {string=} bookedTicketIdentifier - booked ticket id
   * @property {string=} name - attendee's name
   * @property {string=} attendeeCategoryIdentifier - attendee category id
   * @property {Array<number>=} bookedDays - list of days booked
   * @property {Array<string>=} bookedSessions - list of sessions booked
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
