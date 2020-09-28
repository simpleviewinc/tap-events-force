import { getAllBookedTickets } from 'SVUtils/models/tickets'
import { sortAttendeeIntoSections } from 'SVUtils/models/attendees'
import { setAttendeesByTicket } from './setAttendeesByTicket'

/**
 * Creates an object of attendees sorted by the ticket they are each booking
 *
 * @param {Array<Attendee>} attendees
 * @param {Array<Ticket>} tickets
 * @param {Array<BookedTicket>} bookedTickets
 * @return {Object<string, Array<string>>} a map of ticket ids mapped to arrays of attendee ids
 */
const buildSortedAttendees = (attendees, tickets, bookedTicketObject) => {
  const bookedTickets = getAllBookedTickets(bookedTicketObject)
  const attendeeIdsByTicket = {}
  const initSectionData = { tickets, bookedTickets, attendeeIdsByTicket }
  return attendees.reduce(sortAttendeeIntoSections, initSectionData)
}

/**
 * Creates an object of attendees sorted by their associated ticket, then upserts it to the items store
 * @param {Array<Attendee>} attendees
 * @param {Array<Ticket>} tickets
 * @param {Array<BookedTicket>} bookedTickets
 *
 * @return {void}
 */
export const initSortedAttendees = (attendees, tickets, bookedTickets) => {
  const { attendeeIdsByTicket } = buildSortedAttendees(
    attendees,
    tickets,
    bookedTickets
  )
  setAttendeesByTicket(attendeeIdsByTicket)
}
