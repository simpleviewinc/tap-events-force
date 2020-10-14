import React from 'react'
import { ScrollView } from '@keg-hub/keg-components'
import { GroupBookingSection } from './groupBookingSection'
import { useStyle } from '@keg-hub/re-theme'
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
  const { className, styles, onAttendeeSelected, attendeesByTicket } = props

  const viewStyles = useStyle('groupBookingOptions.main', styles?.main)

  // sort tickets by display order and filter out invalid ones
  const tickets = useStoreItems('tickets')
  const sortedTickets = useTicketsForBooking(tickets, attendeesByTicket)

  return (
    <ScrollView
      className={className}
      style={viewStyles}
    >
      { sortedTickets.map(ticket => (
        <GroupBookingSection
          headerClassName='ef-modal-body-highlight'
          attendeeClassName='ef-modal-sub-header'
          styles={styles?.section}
          key={ticket.identifier}
          name={ticket.name}
          attendeeIds={attendeesByTicket[ticket.identifier] || emptyArr}
          onAttendeeSelected={onAttendeeSelected}
        />
      )) }
    </ScrollView>
  )
}
