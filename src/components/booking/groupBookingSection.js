import React, { useMemo } from 'react'
import { Text } from '@keg-hub/keg-components'
import { CheckboxGroup } from 'SVComponents/group/checkboxGroup'
import { useStylesMemo } from 'SVHooks/useStylesMemo'
import { AttendeeCheckboxItem } from './attendeeCheckboxItem'
import { useCurrentSession } from 'SVHooks/booking/useCurrentSession'
import { useBookingSet } from 'SVHooks/booking/useBookingSet'
import { useWaitingSet } from 'SVHooks/booking/useWaitingSet'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'

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

  const bookingList = useBookingSet()
  const waitingList = useWaitingSet()
  const session = useCurrentSession()
  const groupBookingCapacity = useStoreItems('groupBooking.capacity')

  // get the isBookable callback to check if an attendee is eligible to book the session
  const { isBookable } = useRestrictedAttendeeIds(session?.identifier)

  const enableCheck =
    session?.capacity?.isUnlimited ||
    session?.capacity?.isWaitingListAvailable ||
    groupBookingCapacity > 0

  const attendeesForSection = useSectionAttendees(attendeeIds)

  return (
    <CheckboxGroup
      styles={sectionStyles}
      title={name}
    >
      { attendeesForSection?.map(
        ({ bookedTicketIdentifier: attendeeId, name }) => {
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
        }
      ) }
      { !attendeesForSection?.length && (
        <Text>No attendees for this category</Text>
      ) }
    </CheckboxGroup>
  )
}
