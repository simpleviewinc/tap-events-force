import React, { useMemo } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useGroupBookingSession } from 'SVHooks/booking/useGroupBookingSession'
import { useBookingSet } from 'SVHooks/booking/useBookingSet'
import { useWaitingSet } from 'SVHooks/booking/useWaitingSet'
import { AttendeeCheckboxItem } from './attendeeCheckboxItem'
import { useIsAttendeeDisabledCallback } from 'SVHooks/models/attendees/useIsAttendeeDisabledCallback'

/**
 * Gets computed values about the state of all checkboxees in the attendee list
 * @param {import('SVModels/session').Session} session
 * @returns {Object} { enableCheck }
 */
const useCheckboxState = session => {
  const groupBookingCapacity = useStoreItems('groupBooking.capacity')
  return {
    enableCheck:
      session?.capacity?.isUnlimited ||
      session?.capacity?.isWaitingListAvailable ||
      groupBookingCapacity > 0,
  }
}

/**
 * List of attendees for a group booking section
 * @param {Object} props
 * @param {Array<import('SVModels/attendee').Attendee>} props.attendees - attendee list for current section
 * @param {Object} props.itemStyles
 * @param {Object} props.sectionStyles
 * @param {Function} props.onAttendeeSelected
 */
export const AttendeeBookingList = ({
  attendees,
  itemStyles,
  sectionStyles,
  onAttendeeSelected,
  attendeeClassName,
  setCheckedSetter,
}) => {
  const bookingList = useBookingSet()
  const waitingList = useWaitingSet()
  const session = useGroupBookingSession()

  const { enableCheck } = useCheckboxState(session)
  const isAttendeeDisabled = useIsAttendeeDisabledCallback(session, attendees)

  return attendees?.map(({ bookedTicketIdentifier: attendeeId, name }) => {
    const { isBooking, isWaiting, isDisabled } = useMemo(
      () => ({
        isBooking: bookingList.has(attendeeId),
        isWaiting: waitingList.has(attendeeId),
        isDisabled: isAttendeeDisabled(attendeeId),
      }),
      [ attendeeId, bookingList, waitingList, isAttendeeDisabled ]
    )

    return (
      <AttendeeCheckboxItem
        key={attendeeId}
        id={attendeeId}
        name={name}
        textClassName={attendeeClassName}
        onAttendeeSelected={onAttendeeSelected}
        isWaiting={isWaiting}
        sectionStyles={sectionStyles}
        itemStyles={itemStyles}
        disabled={isDisabled}
        enableCheck={enableCheck}
        checked={isBooking || isWaiting}
        setCheckedSetter={setCheckedSetter}
      />
    )
  })
}
