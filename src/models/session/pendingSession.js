import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

/**
 * PendingSession class model: used internally
 * only to track the pending session
 */
export class PendingSession {
  identifier = null
  pendingBookingList = null
  pendingWaitingList = null

  /**
   *
   * @param {object} params
   * @param {number|string=} params.identifier - id of session that is pending
   * @param {Array<string>?} params.pendingBookingList - waiting list of attendee ids that has been submitted to consumer, waiting for completion
   * @param {Array<string>?} params.pendingWaitingList - booking list of attendee ids that has been submitted to consumer, waiting for completion
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
