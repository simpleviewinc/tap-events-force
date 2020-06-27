/**
 * ActiveSession class model
 */
export class ActiveSession {
  /**
   * @param {object} props
   * @property {number|string=} id - id of session
   * @property {boolean=} open - is it opened? Used on mobile
   * @property {string=} bookingState - booking state of the user
   */
  constructor({ id = 0, open = false, bookingState = null } = {}) {
    this.id = id
    this.open = open
    this.bookingState = bookingState
  }
}
