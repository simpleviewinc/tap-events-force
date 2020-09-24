import React, { useMemo } from 'react'
import { Text } from '@keg-hub/keg-components'
import { AttendeeBookingList } from './attendeeBookingList'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { useStylesMemo } from '@keg-hub/re-theme'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

/**
 * Gets the list of Attendee objects for the current section,
 * the ones that have the same ids as in the list
 * of attendeeIdsForSection
 * @param {Array<string>} attendeeIds
 * @returns {Array<Attendee>} section attendees
 */
const useSectionAttendees = attendeeIdsForSection => {
  const attendees = useStoreItems('attendees')
  return useMemo(
    () =>
      attendees.filter(({ bookedTicketIdentifier }) =>
        attendeeIdsForSection?.includes(bookedTicketIdentifier)
      ),
    [ attendees, attendeeIdsForSection ]
  )
}

export const GroupBookingSection = ({
  styles,
  name,
  attendeeIds,
  onAttendeeSelected,
}) => {
  const sectionStyles = useStylesMemo('groupBookingSection', styles)
  const itemStyles = useStylesMemo(
    'form.checkbox.close',
    sectionStyles?.content?.item
  )

  const attendeesForSection = useSectionAttendees(attendeeIds)

  return (
    <CheckboxGroup
      styles={sectionStyles}
      title={name}
    >
      <AttendeeBookingList
        attendees={attendeesForSection}
        onAttendeeSelected={onAttendeeSelected}
        itemStyles={itemStyles}
        sectionStyles={sectionStyles}
      />
      { !attendeesForSection?.length && (
        <Text>No attendees for this category</Text>
      ) }
    </CheckboxGroup>
  )
}
