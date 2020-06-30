import { assignDefinedProps } from 'SVUtils'

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
   * @property {number|string=} id - id of session
   * @property {boolean=} open - is it opened? Used on mobile
   * @property {string=} bookingState - booking state of the user
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
