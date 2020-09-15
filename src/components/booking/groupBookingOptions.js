import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { GroupBookingSection } from './groupBookingSection'
import { useSelector, shallowEqual } from 'react-redux'
import { pipeline, pickKeys, set } from '@keg-hub/jsutils'

/**
 * Returns the ticket associated with the attendee
 * @param {*} attendee
 * @param {*} bookedTickets
 * @param {*} tickets
 */
const getTicketForAttendee = (attendee, bookedTickets, tickets) => {
  const bookedTicketForAttendee = bookedTickets.find(
    bookedTicket => bookedTicket.identifier === attendee.bookedTicketIdentifier
  )

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
    attendeesBySection,
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
    !attendeesBySection[ticket.name] && set(attendeesBySection, ticket.name, [])
    attendeesBySection[ticket.name].push(nextAttendee)
  }

  // check if the attendee is restricted from booking. If so, add it to the restricted list
  isAttendeeRestricted(nextAttendee, session) &&
    restrictedAttendeeIds.add(nextAttendee.bookedTicketIdentifier)

  return sectionData
}

/**
 * Builds a map of booking categories to arrays of attendees who reside in that cateogory
 * @param {Array<Attendee>} attendees
 * @return {Object} map with structure of `initSections`
 */
const useAttendeeBooking = (session, attendees, tickets, bookedTickets) => {
  return useMemo(() => {
    const initSectionData = {
      // data used by reducing function
      session,
      tickets,
      bookedTickets,

      // booking categories mapped to attendees for those categories
      attendeesBySection: {},

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

  const ticketNames = useMemo(
    () =>
      pipeline(
        tickets.map(ticket => ticket.name),
        names => new Set(names),
        Array.from
      ),
    [tickets]
  )

  const { attendeesBySection, restrictedAttendeeIds } = useAttendeeBooking(
    session,
    attendees,
    tickets,
    bookedTickets
  )

  return (
    <View style={viewStyles}>
      { ticketNames.map(section => (
        <GroupBookingSection
          style={styles?.content?.section}
          key={section}
          name={section}
          attendees={attendeesBySection[section]}
          restrictedAttendeeIds={restrictedAttendeeIds}
          onAttendeeSelected={onAttendeeSelected}
          enableCheck={canBookMore}
        />
      )) }
    </View>
  )
}
