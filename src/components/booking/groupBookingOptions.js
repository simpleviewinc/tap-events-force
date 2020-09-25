import React from 'react'
import { ScrollView } from '@keg-hub/keg-components'
import { GroupBookingSection } from './groupBookingSection'
import { useStylesMemo } from '@keg-hub/re-theme'
import { useTicketsForBooking } from 'SVHooks/models/useTicketsForBooking'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const emptyArr = []

/**
 * A list of group booking sections, in a scroll view
 * @param {Object} props
 * @param {Object} props.styles
 * @param {Function?} props.onAttendeeSelected - callback when checkbox is pressed
 * @param {Object<string, Array<string>>} props.attendeesByTicket - lists of attendee ids organized by their ticket ids
 */
export const GroupBookingOptions = props => {
  const { styles, onAttendeeSelected, attendeesByTicket } = props

  const viewStyles = useStylesMemo('groupBookingOptions.main', styles?.main)

  const tickets = useStoreItems('tickets')

  // sort tickets by display order and filter out invalid ones
  const sortedTickets = useTicketsForBooking(tickets, attendeesByTicket)

  return (
    <ScrollView style={viewStyles}>
      { sortedTickets.map(ticket => (
        <GroupBookingSection
          style={styles?.content?.section}
          key={ticket.identifier}
          name={ticket.name}
          attendeeIds={attendeesByTicket[ticket.identifier] || emptyArr}
          onAttendeeSelected={onAttendeeSelected}
        />
      )) }
    </ScrollView>
  )
}
