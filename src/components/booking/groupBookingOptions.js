import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { GroupBookingSection } from './groupBookingSection'
import { useSelector, shallowEqual } from 'react-redux'
import { exists, pickKeys, set } from '@keg-hub/jsutils'

/**
 * Returns the ticket associated with the attendee
 * @param {*} attendee
 * @param {*} bookedTickets
 * @param {*} tickets
 */
const getTicketForAttendee = (attendee, bookedTickets, tickets) => {
  const hasMatchingId = bookedTicket =>
    bookedTicket.identifier === attendee.bookedTicketIdentifier
  const bookedTicketForAttendee = bookedTickets.find(hasMatchingId)

  if (!bookedTicketForAttendee) return null

  return tickets.find(
    ticket => ticket.identifier === bookedTicketForAttendee.ticketIdentifier
  )
}

/**
 * @param {*} attendee
 * @param {*} session
 * @returns { boolean } - true if the attendee cannot be booked for this session
 */
const isAttendeeRestricted = (attendee, session) => {
  const { attendeeCategoryIdentifier: categoryId } = attendee
  const restrictedCategories = session.restrictToAttendeeCategories
  return (
    restrictedCategories.length && !restrictedCategories.includes(categoryId)
  )
}

/**
 * Helper for `buildAttendeesSectionMap` that updates the sections object with the next attendee object
 * @param {*} sectionData - will be modified with nextAttendee
 * @param {Set<string>} sectionData.restrictedAttendeeIds - will be modified with nextAttendee
 * @param {Array<string>} sections[*] - categories
 * @param {*} nextAttendee - attendee object
 */
const sortAttendeeIntoSections = (sectionData, nextAttendee) => {
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

/**
 * Returns a list of all the booked tickets
 * @param {Array<BookedTicket>} bookedTickets
 * @return {Array<BookedTicket>} array of booked tickets and booked subtickets flattened into the same level
 */
const getAllBookedTickets = bookedTickets => {
  return [
    // root tickets
    ...bookedTickets,

    // sub tickets, flattened to the same level, and filter out any that are undefined
    ...bookedTickets
      .flatMap(({ bookedSubTickets }) => bookedSubTickets)
      .filter(exists),
  ]
}

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
 * Sorts tickets by their display order
 * @param {*} tickets
 */
const sortTickets = tickets =>
  tickets.sort(
    (ticketA, ticketB) => ticketA.displayOrder - ticketB.displayOrder
  )

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
    <View style={viewStyles}>
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
    </View>
  )
}
