import React from 'react'
import { Text } from '@keg-hub/keg-components'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { AttendeeCheckboxItem } from './attendeeCheckboxItem'
import {
  useBookingSet,
  useWaitingSet,
  useCurrentSession,
} from 'SVHooks/booking/useSessionBooking'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

export const GroupBookingSection = ({
  styles,
  name,
  attendees,
  isBookable,
  onAttendeeSelected,
}) => {
  const sectionStyles = useStylesMemo('groupBookingSection', styles)
  const itemStyles = useStylesMemo(
    'form.checkbox.close',
    sectionStyles?.content?.item
  )

  const bookingList = useBookingSet()
  const waitingList = useWaitingSet()
  const session = useCurrentSession()
  const currentCapacity = useStoreItems('groupBooking.capacity')

  const enableCheck =
    session?.capacity?.isUnlimited ||
    session?.capacity?.isWaitingListAvailable ||
    currentCapacity > 0

  return (
    <CheckboxGroup
      styles={sectionStyles}
      title={name}
    >
      { attendees?.map(({ bookedTicketIdentifier: attendeeId, name }) => {
        const isBooking = bookingList.has(attendeeId)
        const isWaiting = waitingList.has(attendeeId)

        return (
          <AttendeeCheckboxItem
            key={attendeeId}
            id={attendeeId}
            name={name}
            onAttendeeSelected={onAttendeeSelected}
            isWaiting={isWaiting}
            sectionStyles={sectionStyles}
            itemStyles={itemStyles}
            disabled={!isBookable?.(attendeeId)}
            enableCheck={enableCheck}
            checked={isBooking || isWaiting}
          />
        )
      }) }
      { !attendees?.length && <Text>No attendees for this category</Text> }
    </CheckboxGroup>
  )
}
