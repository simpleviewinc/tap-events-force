/**
 * Returns the ids of the attendees on the booking list for the session
 * @param {string} sessionId - the session object
 * @param {Array<import('SVModels/attendee').Attendee>} attendees - the full attendees list
 * @return {Array<string>} - attendee ids on booking list
 */
export const getExistingBookIds = (sessionId, attendees) => {
  if (!sessionId) return []
  if (!attendees) return []

  return attendees.reduce((list, attendee) => {
    if (!attendee) return list
    const { bookedSessions, bookedTicketIdentifier: id } = attendee
    const isBooked = bookedSessions?.includes(sessionId)
    return isBooked ? [ ...list, id ] : list
  }, [])
}
