import React from 'react'
import { ScrollView } from '@keg-hub/keg-components'
import { GroupBookingSection } from './groupBookingSection'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { useTicketsForBooking } from 'SVHooks/models/useTicketsForBooking'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const emptyArr = []

/**
 *
 * @param {*} param0
 */
export const GroupBookingOptions = props => {
  const { styles, onAttendeeSelected, attendeesByTicket, isBookable } = props

  const viewStyles = useStylesMemo('groupBookingOptions.main', styles?.main)

  // sort tickets and filter out invalid ones
  const tickets = useStoreItems('tickets')
  const sortedTickets = useTicketsForBooking(tickets, attendeesByTicket)

  return (
    <ScrollView style={viewStyles}>
      { sortedTickets.map(ticket => (
        <GroupBookingSection
          style={styles?.content?.section}
          key={ticket.identifier}
          name={ticket.name}
          attendees={attendeesByTicket[ticket.identifier] || emptyArr}
          onAttendeeSelected={onAttendeeSelected}
          isBookable={isBookable}
        />
      )) }
    </ScrollView>
  )
}
