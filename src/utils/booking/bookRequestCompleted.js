import { areSetEqual } from '@keg-hub/jsutils'
import { getExistingBookIds } from 'SVUtils/booking/getExistingBookIds'

/**
 * @param {string} pendingSessionId
 * @param {Array<string>} pendingBookList - array of attendee ids that were requested to be the booking list for the session
 * @param {Array<import('SVModels/Attendee').Attendee>} incomingAttendees - the latest attendees passed in by the consumer
 */
export const bookRequestCompleted = (
  pendingSessionId,
  pendingBookList,
  incomingAttendees
) => {
  // if there is no pendingBookList, then there's no booking request, so we can consider this completed
  if (!pendingBookList) return true

  const incomingBookList = getExistingBookIds(
    pendingSessionId,
    incomingAttendees
  )

  return areSetEqual(pendingBookList, incomingBookList)
}
