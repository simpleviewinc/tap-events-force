/**
 * Returns the ids of the attendees on the waiting list for the session
 * @param {string} sessionId
 * @param {Array<import('SVModels/attendee').Attendee>}  attendees
 * @return {Array<string>} - attendee ids on waiting list
 */
export const getExistingWaitIds = (sessionId, attendees) => {
  if (!sessionId) return []
  if (!attendees) return []

  return attendees.reduce((list, attendee) => {
    if (!attendee) return list
    const { waitingListSessions, bookedTicketIdentifier: id } = attendee
    const shouldWait = waitingListSessions?.includes(sessionId)
    return shouldWait ? [ ...list, id ] : list
  }, [])
}
