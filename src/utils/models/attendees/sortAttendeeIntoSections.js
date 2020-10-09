import { set } from '@keg-hub/jsutils'
import { getTicketForAttendee } from './getTicketForAttendee'

/**
 * Helper for `useAttendeeBookingData` that updates the sections object with the next attendee object
 * @param {Object} sectionData - will be modified with nextAttendee
 * @param {Array<BookedTicket>} sectionData.bookedTickets - booked ticket list
 * @param {Array<Ticket>} sectionData.tickets - ticket list
 * @param {Object<string, Array<Attendee>>} sectionData.attendeeIdsByTicket - will be modified with nextAttendee
 * @param {Attendee} nextAttendee - the attendee object to sort
 */
export const sortAttendeeIntoSections = (sectionData, nextAttendee) => {
  const { bookedTickets, tickets, attendeeIdsByTicket } = sectionData

  // add the attendee to its associated cateogry
  const attendeeTicket = getTicketForAttendee(
    nextAttendee,
    bookedTickets,
    tickets
  )
  if (!attendeeTicket) {
    console.warn('Could not find a valid ticket for attendee. Skipping... \n', {
      nextAttendee,
      tickets,
      bookedTickets,
    })
  }
  else {
    !attendeeIdsByTicket[attendeeTicket.identifier] &&
      set(attendeeIdsByTicket, attendeeTicket.identifier, [])

    attendeeIdsByTicket[attendeeTicket.identifier].push(
      nextAttendee.bookedTicketIdentifier
    )
  }

  return sectionData
}
