import { useMemo, useCallback } from 'react'
import { getAllBookedTickets } from 'SVUtils/models/tickets'
import { sortAttendeeIntoSections } from 'SVUtils/models/attendees'

import { setAttendeesByTicket } from 'SVActions/attendees/setAttendeesByTicket'
import { setRestrictedAttendeeIds } from 'SVActions/attendees/setRestrictedAttendeeIds'

/**
 * Builds a map of booking categories to arrays of attendees who reside in that cateogory
 * @param {Array<Attendee>} attendees
 * @return {Object} object with structure of `initSectionData`
 */
export const useSortedAttendees = (
  session,
  attendees,
  tickets,
  bookedTickets
) => {
  const deps = [ session, attendees, tickets, bookedTickets ]
  const sortAttendees = useCallback(() => buildSortedAttendees(...deps), deps)
  return useMemo(sortAttendees, deps)
}

export const useSortedAttendeesInit = (
  session,
  attendees,
  tickets,
  bookedTickets
) => {
  const deps = [ session, attendees, tickets, bookedTickets ]
  useEffect(() => {
    const { attendeesByTicket, restrictedAttendeeIds } = buildSortedAttendees(
      ...deps
    )

    setAttendeesByTicket(attendeesByTicket)
    setRestrictedAttendeeIds(session, restrictedAttendeeIds)
  }, deps)
}

export const buildSortedAttendees = (
  session,
  attendees,
  tickets,
  bookedTickets
) => {
  const initSectionData = {
    // data used by reducing function `sortAttendeeIntoSections`
    session,
    tickets,
    bookedTickets: getAllBookedTickets(bookedTickets),

    // booking categories mapped to attendees for those categories
    attendeesByTicket: {},

    // identifiers of attendees that cannot be booked for this session, and should be greyed out
    restrictedAttendeeIds: new Set(),

    // count of all attendees sorted into tickets (not necessarily the same length as `attendees`)
    sortedAttendeeCount: 0,
  }

  return attendees.reduce(sortAttendeeIntoSections, initSectionData)
}
