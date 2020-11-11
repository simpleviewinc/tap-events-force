import React, { useMemo, useCallback } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useGroupBookingSession } from 'SVHooks/booking/useGroupBookingSession'
import { useBookingSet } from 'SVHooks/booking/useBookingSet'
import { useWaitingSet } from 'SVHooks/booking/useWaitingSet'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'
import { useBookingTimeConflicts } from 'SVHooks/booking/useBookingTimeConflicts'
import { AttendeeCheckboxItem } from './attendeeCheckboxItem'
import { Values } from 'SVConstants'

const { CATEGORIES, SUB_CATEGORIES } = Values

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
 *
 * @param {import('SVModels/').} session
 * @param {*} attendees
 */
const useIsBlockedCallback = (session, attendees) => {
  const agendaSettings = useStoreItems(
    `${CATEGORIES.SETTINGS}.${SUB_CATEGORIES.AGENDA_SETTINGS}`
  )
  const agendaSessions = useStoreItems(CATEGORIES.AGENDA_SESSIONS)
  const timeConflicts = useBookingTimeConflicts(
    session,
    attendees,
    agendaSessions[agendaSettings?.activeDayNumber ?? 1]
  )
  return useCallback(attendeeId => timeConflicts?.[attendeeId], [timeConflicts])
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

  // get the isBookable callback to check if an attendee is eligible to book the session
  const { isBookable } = useRestrictedAttendeeIds(session?.identifier)
  const { enableCheck } = useCheckboxState(session)
  const isBlocked = useIsBlockedCallback(session, attendees)

  return attendees?.map(({ bookedTicketIdentifier: attendeeId, name }) => {
    const { isBooking, isWaiting, isDisabled } = useMemo(
      () => ({
        isBooking: bookingList.has(attendeeId),
        isWaiting: waitingList.has(attendeeId),
        isDisabled: !isBookable?.(attendeeId) || isBlocked(attendeeId),
      }),
      [ attendeeId, bookingList, waitingList, isBookable ]
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
