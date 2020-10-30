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
const { BOOKING_MODES, CATEGORIES } = Values

/**
 * Custom hook to get a lists for attendees that have booked the session, or are on the waiting list
 * @param {string} sessionId - Id of the current session
 * @param {Array} attendees - Group of attendees from the store
 *
 * @returns {Object} Lists of attendees that have booked the session or are on the waiting list
 */
const useBookingLists = (sessionId, attendees) => {
  return useMemo(
    () => ({
      bookingList: getExistingBookIds(sessionId, attendees),
      waitingList: getExistingWaitIds(sessionId, attendees),
    }),
    [ sessionId, attendees ]
  )
}

/**
 * Custom hook to get a set of items from the store
 * <br/>Also gets the current booking mode based on the amount of attendees in the store
 *
 * @returns {Object} Data extracted from the store
 */
const useStoreData = () => {
  const storeData = useStoreItems([
    CATEGORIES.SETTINGS,
    CATEGORIES.ATTENDEES,
    CATEGORIES.AGENDA_SESSIONS,
    CATEGORIES.ATTENDEES_BY_TICKET,
    CATEGORIES.PENDING_SESSION,
  ])

  return {
    ...storeData,
    bookingMode:
      storeData?.attendees?.length > 1
        ? BOOKING_MODES.GROUP
        : BOOKING_MODES.SINGLE,
  }
}

/**
 * Custom hook to build a booking model from the passed in arguments
 *
 * @param {string} state - The current booking state of the session
 * @param {import('SVModels/session').Session} session
 * @param {string} bookingMode - Current mode of booking for the session (single|group)
 * @param {Array} bookingLists - List of attendee ids that are booked or are on the waiting list
 * @param {Object} timeConflicts - Key value pairs of attendees booked in conflicting sessions
 * @param {Array} bookableCount - Attendees that can book the current session
 * @param {Object} pendingSession - the object indicating if a session has submitted a booking request
 *
 * @returns {import('SVModels/session/bookingState').BookingState} model
 */
const useBookingFactory = (
  state,
  session,
  bookingMode,
  bookingLists,
  timeConflicts,
  bookableCount,
  pendingSession
) => {
  return useMemo(
    () =>
      checkCall(bookingStateFactory[state], {
        session,
        bookingMode,
        timeConflicts,
        bookableCount,
        pendingSession,
        ...bookingLists,
      }) || null,
    [
      state,
      session,
      bookingMode,
      bookingLists,
      timeConflicts,
      bookableCount,
      pendingSession,
    ]
  )
}

/**
 * Custom hook to get the children and styles of the booking button
 * <br/>Base on the session and it's current state
 * @param {import('SVModels/session').Session} props.session
 */
export const useBookingState = session => {
  const sessionId = session?.identifier
  const state = getBookingState(session)
  const { remainingCount } = parseSessionCapacity(session?.capacity)

  // Array of attendee ids that can not book this session
  const { restrictedIdsForSession } = useRestrictedAttendeeIds(sessionId)

  // Items from the store to determin the current booking state
  const {
    attendees,
    attendeesByTicket,
    agendaSessions,
    bookingMode,
    settings,
    pendingSession,
  } = useStoreData()

  // Lists for attendees that have booked the session, or are on the waiting list
  const bookingLists = useBookingLists(sessionId, attendees)

  // Attendees with time conflicts with the current session
  const timeConflicts = useBookingTimeConflicts(
    session,
    attendees,
    agendaSessions[settings?.agendaSettings?.activeDayNumber ?? 1]
  )

  // Attendees that can book the current session
  const { bookableAttendeeCount } = useGroupCounts(
    attendeesByTicket,
    restrictedIdsForSession,
    remainingCount,
    session?.capacity?.isUnlimited
  )

  // Create the booking model from the booking factory
  return useBookingFactory(
    state,
    session,
    bookingMode,
    bookingLists,
    timeConflicts,
    bookableAttendeeCount,
    pendingSession
  )
}
