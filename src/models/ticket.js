import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class Ticket {
  identifier = undefined
  ticketType = undefined
  name = undefined
  displayOrder = undefined
  price = undefined

  /**
   * Ticket class model
   * @param {object} params
   * @param {string} params.identifier
   * @param {string} params.ticketType - one of TicketType values
   * @param {string} params.name
   * @param {number} params.displayOrder
   * @param {number?} params.price
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
