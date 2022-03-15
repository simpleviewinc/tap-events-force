import React from 'react'
import { AttendeeCheckboxItem } from './attendeeCheckboxItem'
import { useIsAttendeeDisabledCallback } from 'SVHooks/models/attendees/useIsAttendeeDisabledCallback'
import { useGroupBookingContext } from 'SVContexts/booking/groupBookingContext'

/**
 * Gets computed values about the state of all checkboxees in the attendee list
 * @param {import('SVModels/session').Session} session
 * @param {number} groupBookingCapacity - current booking capacity of the session
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

const isWaitingListCapacityEmpty = reducerState => {
  const { session, waitingCapacity } = reducerState
  if (session?.capacity?.isWaitingListAvailable) return waitingCapacity === 0
  else return false
}

const isBookingListCapacityEmpty = reducerState =>
  reducerState?.bookingCapacity === 0

const isAttendeeBooked = (reducerState, attendeeId) =>
  reducerState.current?.bookingList?.includes(attendeeId)

const isAttendeeWaiting = (reducerState, attendeeId) =>
  reducerState.current?.waitingList?.includes(attendeeId)

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

  const { enableCheck } = useCheckboxState(state.session, state.bookingCapacity)

  // check if attendee is restricted on the session
  const isAttendeeDisabled = useIsAttendeeDisabledCallback(
    state.session,
    attendees
  )

  const emptyWaitList = isWaitingListCapacityEmpty(state)
  const emptyBookList = isBookingListCapacityEmpty(state)

  return attendees?.map(({ bookedTicketIdentifier: attendeeId, name }) => {
    const isBooking = isAttendeeBooked(state, attendeeId)
    const isWaiting = isAttendeeWaiting(state, attendeeId)

    // Attendee is disabled if he/she is restricted on the session.
    // He/she is also disabled  if there are no spots available on the
    // wait list nor the booking list, EXCEPT when the attendee is already on
    // one of those lists. If they are, then we still need to enable them
    // so that the user can uncheck them.
    const shouldAppearDisabled =
      isAttendeeDisabled(attendeeId) ||
      (emptyWaitList && emptyBookList && !(isWaiting || isBooking))

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
        isAttendeeDisabled={shouldAppearDisabled}
        enableCheck={enableCheck}
        checked={isBooking || isWaiting}
      />
    )
  })
}
