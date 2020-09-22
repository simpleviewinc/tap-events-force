import React from 'react'
import { Text } from '@keg-hub/keg-components'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { AttendeeCheckboxItem } from './attendeeCheckboxItem'

export const GroupBookingSection = ({
  styles,
  name,
  attendees,
  isBookable,
  onAttendeeSelected,
  attendeesBooking,
  attendeesWaiting,
  enableCheck = true,
}) => {
  const sectionStyles = useStylesMemo('groupBookingSection', styles)
  const itemStyles = useStylesMemo(
    'form.checkbox.close',
    sectionStyles?.content?.item
  )

  return (
    <CheckboxGroup
      styles={sectionStyles}
      title={name}
    >
      { attendees?.map(({ bookedTicketIdentifier: attendeeId, name }) => {
        const isBooking = attendeesBooking.has(attendeeId)
        const isWaiting = attendeesWaiting.has(attendeeId)

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
