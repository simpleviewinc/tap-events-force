import { getAllBookedTickets } from 'SVUtils/models/tickets'
import {
  sortAttendeeIntoSections,
  buildRestrictedAttendeeSet,
} from 'SVUtils/models/attendees'
import { setRestrictedAttendeeIds } from './setRestrictedAttendeeIds'
import { setAttendeesByTicket } from './setAttendeesByTicket'

const buildSortedAttendees = (attendees, tickets, bookedTicketObject) => {
  const bookedTickets = getAllBookedTickets(bookedTicketObject)
  const attendeeIdsByTicket = {}
  const initSectionData = { tickets, bookedTickets, attendeeIdsByTicket }
  return attendees.reduce(sortAttendeeIntoSections, initSectionData)
}

export const initSortedAttendees = (attendees, tickets, bookedTickets) => {
  const { attendeeIdsByTicket } = buildSortedAttendees(
    attendees,
    tickets,
    bookedTickets
  )
  setAttendeesByTicket(attendeeIdsByTicket)
}

/**
 * Builds and sets in the store the restricted attendees array for each session
 * @param {Array<Session>} sessions
 * @param {Array<Attendee>} attendees
 */
export const initRestrictedAttendees = (sessions, attendees) => {
  sessions.map(session => {
    const restrictedAttendeeIds = buildRestrictedAttendeeSet(attendees, session)
    setRestrictedAttendeeIds(
      session.identifier,
      Array.from(restrictedAttendeeIds)
    )
  })
}
