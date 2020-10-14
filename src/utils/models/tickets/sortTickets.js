/**
 * Sorts tickets by their display order
 * @param {Array<import('SVModels/ticket').Ticket>} tickets - list of agenda tickets
 * @return {Array<import('SVModels/ticket').Ticket>} the sorted tickets
 */
export const sortTickets = tickets =>
  tickets.sort(
    (ticketA, ticketB) => ticketA.displayOrder - ticketB.displayOrder
  )
