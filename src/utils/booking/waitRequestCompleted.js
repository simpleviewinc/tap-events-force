import { areSetEqual } from '@keg-hub/jsutils'
import { getExistingWaitIds } from 'SVUtils/booking/getExistingWaitIds'

/**
 * @param {string} pendingSessionId
 * @param {Array<string>} pendingWaitList - array of attendee ids that were requested to be the booking list for the session
 * @param {Array<import('SVModels/Attendee').Attendee>} incomingAttendees - the latest attendees passed in by the consumer
 * @returns {boolean} - true if the waiting-list request completed, indicated by the submitted book list
 * matching the incoming attendees
 */
export const waitRequestCompleted = (
  pendingSessionId,
  pendingWaitList,
  incomingAttendees
) => {
  // if there is no pendingWaitList, then theres no waiting request, so we can consider this completed
  if (!pendingWaitList) return true

  const incomingWaitList = getExistingWaitIds(
    pendingSessionId,
    incomingAttendees
  )

  return areSetEqual(pendingWaitList, incomingWaitList)
}
