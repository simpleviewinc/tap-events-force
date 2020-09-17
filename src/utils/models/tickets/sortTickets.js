/**
 * Sorts tickets by their display order
 * @param {*} tickets
 */
export const sortTickets = tickets =>
  tickets.sort(
    (ticketA, ticketB) => ticketA.displayOrder - ticketB.displayOrder
  )
