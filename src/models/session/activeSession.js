/**
 * ActiveSession class model
 */
export class ActiveSession {
  /**
   * @param {number|string=} id - id of session
   * @param {boolean=} open - is it opened? Used on mobile
   * @param {string=} bookingState - booking state of the user
   */
  constructor(id = 0, open = false, bookingState = null) {
    this.id = id
    this.open = open
    this.bookingState = bookingState
  }
}
