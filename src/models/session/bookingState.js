import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

/**
 * BookingState class model
 */
export class BookingState {
  sessionId = null
  state = null
  icon = null
  text = false
  disabled = false
  pending = false
  displayAmount = null
  mode = null
  bookedCount = null

  /**
   * @param {object} params
   * @param {string=} params.sessionId - Identifier of the session tied to this booking state
   * @param {string=} params.state - Current state of the session
   * @param {Component=} params.icon - Name of the icon associated with the current state
   * @param {string=} params.text - Booking state display text content
   * @param {Object=} params.styles - Booking state display styles
   * @param {boolean=} params.disabled - Should the button display of the booking state be disabled
   * @param {boolean=} params.pending - Should the button show a loading spinner, indicating it's booking is pending
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
