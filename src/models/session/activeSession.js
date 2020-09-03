import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

/**
 * ActiveSession class model
 */
export class ActiveSession {
  id = 0
  open = false
  bookingState = null

  /**
   *
   * @param {object} params
   * @param {number|string=} params.id - id of session
   * @param {boolean=} params.open - is it opened? Used on mobile
   * @param {string=} params.bookingState - booking state of the user
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
