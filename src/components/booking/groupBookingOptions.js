import React from 'react'
import { ScrollView } from '@keg-hub/keg-components'
import { GroupBookingSection } from './groupBookingSection'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { useTicketsForBooking } from 'SVHooks/models/useTicketsForBooking'

const emptyArr = []

/**
 *
 * @param {*} param0
 */
export const GroupBookingOptions = props => {
  const {
    styles,
    onAttendeeSelected,
    tickets,
    attendeesByTicket,
    restrictedAttendeeIds,
    isBookable,
    isAttendingBooking,
    isAttendeeWaiting,
    canBookMore = true,
  } = props

  const viewStyles = useStylesMemo('groupBookingOptions.main', styles?.main)

  // sort tickets and filter out invalid ones
  const sortedTickets = useTicketsForBooking(tickets, attendeesByTicket)

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
          isAttendingBooking={isAttendingBooking}
          isAttendingWaiting={isAttendeeWaiting}
          isBookable={isBookable}
          enableCheck={canBookMore}
        />
      )) }
    </ScrollView>
  )
}
