import { getAllBookedTickets } from 'SVUtils/models/tickets'
import { sortAttendeeIntoSections } from 'SVUtils/models/attendees'
import { setAttendeesByTicket } from './setAttendeesByTicket'
import { isArr, noPropArr, noOpObj, validate } from '@keg-hub/jsutils'

/**
 * Creates an object of attendees sorted by the ticket they are each booking
 *
 * @param {Array<import('SVModels/attendee').Attendee>}  attendees - list of attendees to sort
 * @param {Array<Ticket>} tickets - list of tickets to sort the attendees by
 * @param {Array<BookedTicket>} bookedTickets - list of BookedTicket model objects, used to find the associated ticket for an attendee
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
 * @param {Array<import('SVModels/attendee').Attendee>}  attendees - attendees to sort
 * @param {Array<Ticket>} tickets - tickets to sort the attendees by
 * @param {Array<BookedTicket>} bookedTickets - list of BookedTicket model objects, used to find the associated ticket for an attendee
 *
 * @return {void}
 */
export const initSortedAttendees = (
  attendees,
  tickets = noPropArr,
  bookedTickets = noPropArr
) => {
  const [valid] = validate(
    { attendees, tickets, bookedTickets },
    { $default: isArr }
  )
  if (!valid) return

  const { attendeeIdsByTicket } =
    tickets.length && bookedTickets.length
      ? buildSortedAttendees(attendees, tickets, bookedTickets)
      : noOpObj

  setAttendeesByTicket(attendeeIdsByTicket)
}
