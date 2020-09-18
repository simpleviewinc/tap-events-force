import React, { useMemo } from 'react'
import { ScrollView } from '@keg-hub/keg-components'
import { GroupBookingSection } from './groupBookingSection'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { sortTickets, getAllBookedTickets } from 'SVUtils/models/tickets'
import { sortAttendeeIntoSections } from 'SVUtils/models/attendees'

/**
 * Builds a map of booking categories to arrays of attendees who reside in that cateogory
 * @param {Array<Attendee>} attendees
 * @return {Object} object with structure of `initSectionData`
 */
const useAttendeeBooking = (session, attendees, tickets, bookedTickets) => {
  return useMemo(() => {
    // booked tickets can contain sub tickets, and we need to consider those as well when sorting attendees
    const initSectionData = {
      // data used by reducing function
      session,
      tickets,
      bookedTickets: getAllBookedTickets(bookedTickets),

      // booking categories mapped to attendees for those categories
      attendeesByTicket: {},

      // identifiers of attendees that cannot be booked for this session, and should be greyed out
      restrictedAttendeeIds: new Set(),
    }

    return attendees.reduce(sortAttendeeIntoSections, initSectionData)
  }, [ session, attendees, tickets, bookedTickets ])
}

const emptyArr = []

/**
 *
 * @param {*} param0
 */
export const GroupBookingOptions = props => {
  const { styles, session, onAttendeeSelected, canBookMore = true } = props

  const viewStyles = useStylesMemo('groupBookingOptions.main', styles?.main)

  const { attendees, tickets, bookedTickets } = useStoreItems([
    'attendees',
    'tickets',
    'bookedTickets',
  ])

  // get two data structures for attendees: a map organizing attendees by ticket, and a set of
  // attendee ids that are restricted from booking the session
  const { attendeesByTicket, restrictedAttendeeIds } = useAttendeeBooking(
    session,
    attendees,
    tickets,
    bookedTickets
  )

  // list of tickets sorted by display order, and filters out any that do not have attendees
  const sortedTickets = useMemo(
    () =>
      sortTickets(tickets).filter(
        ticket => attendeesByTicket[ticket.identifier]
      ),
    [ tickets, attendeesByTicket ]
  )

  return (
    <ScrollView style={viewStyles}>
      { sortedTickets.map(ticket => (
        <GroupBookingSection
          style={styles?.content?.section}
          key={ticket.identifier}
          name={ticket.name}
          attendees={attendeesByTicket[ticket.identifier] || emptyArr}
          restrictedAttendeeIds={restrictedAttendeeIds}
          onAttendeeSelected={onAttendeeSelected}
          enableCheck={canBookMore}
        />
      )) }
    </ScrollView>
  )
}
