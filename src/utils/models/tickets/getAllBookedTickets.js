import { exists } from '@keg-hub/jsutils'

/**
 * Returns a list of all the booked tickets
 * @param {Array<BookedTicket>} bookedTickets
 * @return {Array<BookedTicket>} array of booked tickets and booked subtickets flattened into the same level
 */
export const getAllBookedTickets = bookedTickets => {
  return [
    // root tickets
    ...bookedTickets,

    // sub tickets, flattened to the same level, and filter out any that are undefined
    ...bookedTickets.reduce((allBookedTickets, { bookedSubTickets }) => {
      exists(bookedSubTickets) &&
        bookedSubTickets.map(ticket => allBookedTickets.push(ticket))
      return allBookedTickets
    }, []),
  ]
}
