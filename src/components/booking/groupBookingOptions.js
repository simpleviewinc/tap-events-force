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
