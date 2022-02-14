import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class Attendee {
  bookedTicketIdentifier = ''
  name = ''
  attendeeCategoryIdentifier = ''
  bookedDays = []
  bookedSessions = []
  waitingListSessions = []

  /**
   * Attendee class model
   * @param {object} params
   * @param {string=} params.bookedTicketIdentifier - booked ticket id. This functions as the unique id of the attendee.
   * It also must correspond to an existing ticket, or the attendee will be omitted from the redux store.
   * @param {string=} params.name - attendee's name
   * @param {string=} params.attendeeCategoryIdentifier - attendee category id
   * @param {Array<number>=} params.bookedDays - list of days booked
   * @param {Array<string>=} params.bookedSessions - list of sessions booked
   * @param {Array<string>=} params.waitingListSessions - list of sessions on waiting list
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
