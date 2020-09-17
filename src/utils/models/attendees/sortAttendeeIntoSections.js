import { set } from '@keg-hub/jsutils'
import { getTicketForAttendee } from './getTicketForAttendee'
import { isAttendeeRestricted } from './isAttendeeRestricted'

/**
 * Helper for `buildAttendeesSectionMap` that updates the sections object with the next attendee object
 * @param {*} sectionData - will be modified with nextAttendee
 * @param {Set<string>} sectionData.restrictedAttendeeIds - will be modified with nextAttendee
 * @param {Array<string>} sections[*] - categories
 * @param {*} nextAttendee - attendee object
 */
export const sortAttendeeIntoSections = (sectionData, nextAttendee) => {
  const {
    session,
    bookedTickets,
    tickets,
    restrictedAttendeeIds,
    attendeesByTicket,
  } = sectionData

  // add the attendee to its associated cateogry
  const ticket = getTicketForAttendee(nextAttendee, bookedTickets, tickets)
  if (!ticket) {
    console.warn('Could not find a valid ticket for attendee. Skipping... \n', {
      nextAttendee,
      tickets,
      bookedTickets,
    })
  }
  else {
    !attendeesByTicket[ticket.identifier] &&
      set(attendeesByTicket, ticket.identifier, [])
    attendeesByTicket[ticket.identifier].push(nextAttendee)
  }

  // check if the attendee is restricted from booking. If so, add it to the restricted list
  isAttendeeRestricted(nextAttendee, session) &&
    restrictedAttendeeIds.add(nextAttendee.bookedTicketIdentifier)

  return sectionData
}
