import React, { useMemo } from 'react'
import { Text } from '@keg-hub/keg-components'
import { AttendeeBookingList } from './attendeeBookingList'
import { CheckGroup } from '@keg-hub/keg-components'
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

/**
 * A section in the group booker, containing a header and a list of checkable attendees
 *
 * @param {Object} props
 * @param {Object} props.styles
 * @param {string} props.name - header title
 * @param {Array<string>} props.attendeeIds - ids of attendees to display in section
 * @param {Function?} onAttendeeSelected - callback of form (id) => {...}, fired when an attendee checkbox is toggled
 */
export const GroupBookingSection = ({
  className,
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
    <CheckGroup
      className={className}
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
    </CheckGroup>
  )
}
