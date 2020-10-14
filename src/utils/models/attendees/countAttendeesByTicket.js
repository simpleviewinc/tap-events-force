/**
 * Counts the total number of attendees in the map of attendees by ticket
 * @param {Object<string, Array<Attendee>>} attendeesByTickets
 * @return {number} - the count
 */
export const countAttendeesByTicket = attendeesByTickets => {
  return Object.values(attendeesByTickets).reduce(
    (count, attendeeList) => count + (attendeeList?.length ?? 0),
    0
  )
}
