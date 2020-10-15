import { useMemo } from 'react'
import { checkCall } from '@keg-hub/jsutils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useGroupCounts } from 'SVHooks/booking/useGroupCounts'
import { useBookingLists } from 'SVHooks/booking/useBookingLists'
import { getBookingState } from 'SVUtils/models/sessions/getBookingState'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { bookingStateFactory } from 'SVUtils/models/sessions/bookingStateFactory'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'

/**
 * Custom hook to get the children and styles of the booking button
 * <br/>Base on the session and it's current state
 * @param {Object} props
 * @param {Object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
export const useBookingState = session => {
  const state = getBookingState(session)
  const { remainingCount } = parseSessionCapacity(session?.capacity)

  // Array of attendee ids that can not book this session
  const { restrictedIdsForSession } = useRestrictedAttendeeIds(
    session?.identifier
  )

  const { attendees, attendeesByTicket } = useStoreItems([
    'attendees',
    'attendeesByTicket',
  ])

  // Update to pull booking type based on attendees
  const bookingType = attendees.length > 1 ? 'group' : 'single'
  const [ bookingList, waitingList ] = useBookingLists(session, attendees, false)

  const {
    sortedAttendeeCount,
    bookableAttendeeCount,
    initialCapacityExceedsNeed,
  } = useGroupCounts(
    attendeesByTicket,
    restrictedIdsForSession,
    remainingCount,
    session?.capacity?.isUnlimited
  )

  return useMemo(() => {
    return (
      checkCall(bookingStateFactory[state], {
        session,
        bookingType,
        bookingList,
        waitingList,
        sortedAttendeeCount,
        bookableAttendeeCount,
        initialCapacityExceedsNeed,
      }) || null
    )
  }, [
    state,
    session,
    waitingList,
    bookingList,
    bookingType,
    sortedAttendeeCount,
    bookableAttendeeCount,
    initialCapacityExceedsNeed,
  ])
}
