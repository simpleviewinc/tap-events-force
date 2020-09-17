import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { ScrollView } from '@keg-hub/keg-components'
import { GroupBookingSection } from './groupBookingSection'
import { useSelector, shallowEqual } from 'react-redux'
import { pickKeys } from '@keg-hub/jsutils'
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

/**
 *
 * @param {*} param0
 */
export const GroupBookingOptions = props => {
  const { styles, session, onAttendeeSelected, canBookMore = true } = props

  const theme = useTheme()
  const mainStyles = theme.get('groupBookingOptions.main')
  const viewStyles = useMemo(() => theme.join(mainStyles, styles?.main), [
    mainStyles,
    styles,
  ])

  const { attendees, tickets, bookedTickets } = useSelector(
    store => pickKeys(store.items, [ 'attendees', 'tickets', 'bookedTickets' ]),
    shallowEqual
  )

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
    [tickets]
  )

  return (
    <ScrollView style={viewStyles}>
      { sortedTickets.map(ticket => (
        <GroupBookingSection
          style={styles?.content?.section}
          key={ticket.identifier}
          name={ticket.name}
          attendees={attendeesByTicket[ticket.identifier] || []}
          restrictedAttendeeIds={restrictedAttendeeIds}
          onAttendeeSelected={onAttendeeSelected}
          enableCheck={canBookMore}
        />
      )) }
    </ScrollView>
  )
}
