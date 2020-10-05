/**
 * Returns the ticket associated with the attendee
 * @param {import('SVModels/attendee').Attendee} attendee
 * @param {Array<import('SVModels/bookedTicket').BookedTicket>} bookedTickets
 * @param {Array<import('SVModels/Ticket').ticket>} tickets
 */
export const getTicketForAttendee = (attendee, bookedTickets, tickets) => {
  const hasMatchingId = bookedTicket =>
    bookedTicket.identifier === attendee.bookedTicketIdentifier
  const bookedTicketForAttendee = bookedTickets.find(hasMatchingId)

  if (!bookedTicketForAttendee) return null

  return tickets.find(
    ticket => ticket.identifier === bookedTicketForAttendee.ticketIdentifier
  )
}
