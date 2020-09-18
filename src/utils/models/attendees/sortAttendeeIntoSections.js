import { set } from '@keg-hub/jsutils'
import { getTicketForAttendee } from './getTicketForAttendee'
import { isAttendeeRestricted } from './isAttendeeRestricted'

/**
 * Helper for `useAttendeeBookingData` that updates the sections object with the next attendee object
 * @param {*} sectionData - will be modified with nextAttendee
 * @param {Object} sectionData.session - session
 * @param {Array<BookedTicket>} sectionData.bookedTickets - booked ticket list
 * @param {Array<Ticket>} sectionData.tickets - ticket list
 * @param {Set<string>} sectionData.restrictedAttendeeIds - will be modified with nextAttendee
 * @param {Object<string, Array<Attendee>>} sectionData.attendeesByTicket - will be modified with nextAttendee
 * @param {number} sectionData.sortedAttendeeCount - number of attendees sorted into ticket buckets
 * @param {Attendee} nextAttendee - the attendee object to sort
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
    !attendeesByTicket[attendeeTicket.identifier] &&
      set(attendeesByTicket, attendeeTicket.identifier, [])

    attendeesByTicket[attendeeTicket.identifier].push(nextAttendee)

    sectionData.sortedAttendeeCount += 1
  }

  // check if the attendee is restricted from booking. If so, add it to the restricted list
  const isRestricted = isAttendeeRestricted(nextAttendee, session)
  isRestricted && restrictedAttendeeIds.add(nextAttendee.bookedTicketIdentifier)

  return sectionData
}
