import React, { useCallback } from 'react'
import { AttendeeCheckboxItem } from './attendeeCheckboxItem'
import { Values } from 'SVConstants'
const { CATEGORIES } = Values
import { useIsAttendeeDisabledCallback } from 'SVHooks/models/attendees/useIsAttendeeDisabledCallback'
import { useGroupBookingContext } from 'SVContexts/booking/groupBookingContext'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

/**
 * Gets computed values about the state of all checkboxees in the attendee list
 * @param {import('SVModels/session').Session} session
 * @param {number} groupBookingCapacity - current capacity of the session
 * @returns {Object} { enableCheck }
 */
const useCheckboxState = (session, groupBookingCapacity) => {
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
 * @param {string} props.attendeeClassname - class name for attendee item
 */
export const AttendeeBookingList = ({
  attendees,
  itemStyles,
  sectionStyles,
  attendeeClassName,
}) => {
  const { state, actions } = useGroupBookingContext()

  const { enableCheck } = useCheckboxState(state.session, state.capacity)
  const isAttendeeRestricted = useIsAttendeeDisabledCallback(
    state.session,
    attendees
  )
  const pendingSession = useStoreItems(CATEGORIES.PENDING_SESSION)
  const isAttendeeDisabled = useCallback(
    id => pendingSession?.identifier || isAttendeeRestricted(id)
  )

  return attendees?.map(({ bookedTicketIdentifier: attendeeId, name }) => {
    const isBooking = state.current?.bookingList?.includes(attendeeId)
    const isWaiting = state.current?.waitingList?.includes(attendeeId)

    return (
      <AttendeeCheckboxItem
        key={attendeeId}
        id={attendeeId}
        name={name}
        textClassName={attendeeClassName}
        onAttendeeSelected={actions.updateSessionBooking}
        isWaiting={isWaiting}
        sectionStyles={sectionStyles}
        itemStyles={itemStyles}
        isAttendeeDisabled={isAttendeeDisabled}
        enableCheck={enableCheck}
        checked={isBooking || isWaiting}
      />
    )
  })
}
