import { useMemo } from 'react'
import { checkCall } from '@keg-hub/jsutils'
import { useGroupCounts } from './useGroupCounts'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useBookingTimeConflicts } from './useBookingTimeConflicts'
import { getBookingState } from 'SVUtils/models/sessions/getBookingState'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { bookingStateFactory } from 'SVUtils/models/sessions/bookingStateFactory'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'
import { getExistingBookIds } from 'SVUtils/booking/getExistingBookIds'
import { getExistingWaitIds } from 'SVUtils/booking/getExistingWaitIds'
import { Values } from 'SVConstants'
const { CATEGORIES } = Values

/**
 * Custom hook to get the children and styles of the booking button
 * <br/>Base on the session and it's current state
 * @param {Object} props
 * @param {Object} props.styles
 * @param {import('SVModels/session').Session} props.session
 */
export const useBookingState = session => {
  const sessionId = session?.identifier
  const state = getBookingState(session)
  const { remainingCount } = parseSessionCapacity(session?.capacity)

  // Array of attendee ids that can not book this session
  const { restrictedIdsForSession } = useRestrictedAttendeeIds(
    sessionId
  )

  const { attendees, attendeesByTicket, agendaSessions, settings } = useStoreItems([
    CATEGORIES.SETTINGS,
    CATEGORIES.ATTENDEES,
    CATEGORIES.AGENDA_SESSIONS,
    CATEGORIES.ATTENDEES_BY_TICKET,
  ])

  const timeConflicts = useBookingTimeConflicts(
    session,
    attendees,
    agendaSessions[settings?.agendaSettings?.activeDayNumber ?? 1]
  )
  const bookingType = attendees.length > 1 ? 'group' : 'single'

  if(bookingType === 'single'){
    
  }
    


  const {
    bookingList,
    waitingList,
  } = useMemo(() => {

    const bookingList = getExistingBookIds(sessionId, attendees)
    const waitingList = getExistingWaitIds(sessionId, attendees)
    
    return { bookingList, waitingList }
  }, [ sessionId, attendees ])

  const { bookableAttendeeCount } = useGroupCounts(
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
        timeConflicts,
        bookableAttendeeCount,
      }) || null
    )
  }, [
    state,
    session,
    waitingList,
    bookingList,
    bookingType,
    timeConflicts,
    bookableAttendeeCount,
  ])
}
