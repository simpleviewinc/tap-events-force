import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class BookedTicket {
  identifier = undefined
  ticketIdentifier = undefined
  bookedSubTickets = undefined

  /**
   * Attendee class model
   * @param {object} params
   * @param {string=} params.identifier
   * @param {string=} params.ticketIdentifier - id of the ticket associated with this item
   * @param {Array<BookedTicket>?} params.bookedSubTickets - sub tickets associated with this ticket
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
