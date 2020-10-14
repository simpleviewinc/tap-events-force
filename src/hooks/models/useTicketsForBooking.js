import { useMemo } from 'react'
import { sortTickets } from 'SVUtils/models/tickets'

/**
 * Returns a memoized subset of the ticket array that is:
 * a) sorted; and
 * b) filtered to only include tickets that have associated attendees for booking
 * @param {Array<import('SVModels/ticket').Ticket>} tickets
 * @param {Object<string, Array<import('SVModels/attendee').Attendee>>} attendeesByTicket
 * @return {Array<import('SVModels/ticket').Ticket>} - the sorted, filtered list
 */
export const useTicketsForBooking = (tickets, attendeesByTicket) => {
  return useMemo(
    () =>
      sortTickets(tickets).filter(
        ticket => attendeesByTicket?.[ticket.identifier]
      ),
    [ tickets, attendeesByTicket ]
  )
}
