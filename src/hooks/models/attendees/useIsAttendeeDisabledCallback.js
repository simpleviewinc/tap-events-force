import { useCallback } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'
import { useBookingTimeConflicts } from 'SVHooks/booking/useBookingTimeConflicts'
import { useIsRegisteredForDayCallback } from './useIsRegisteredForDayCallback'
import { Values } from 'SVConstants'
import { validate, isObj, isArr } from '@keg-hub/jsutils'

const { CATEGORIES } = Values

/**
 * Helper for `useIsAttendeeDisabledCallback` that checks for time conflicts
 * @param {import('SVModels/Session').Session} session
 * @param {Array<import('SVModels/Attendee').Attendee>} attendees
 * @returns {Function?} a callback of form (attendeeId) -> Boolean, which returns
 * true if the attendee is timeblocked against `session`
 */
const useIsTimeBlockedCallback = (session, attendees) => {
  const agendaSessions = useStoreItems(CATEGORIES.AGENDA_SESSIONS)
  const timeConflicts = useBookingTimeConflicts(
    session,
    attendees,
    agendaSessions[session?.dayNumber]
  )
  return useCallback(attendeeId => Boolean(timeConflicts?.[attendeeId]), [
    timeConflicts,
  ])
}

/**
 * Helper for determining if an attendee is restricted from booking a session
 *  - checks both the restricted attendee list and searches for time conflicts with other sessions
 * @param {import('SVModels/Session').Session} session
 * @param {Array<import('SVModels/Attendee').Attendee>} attendees
 * @returns {Function?} a callback of form (attendeeId) -> Boolean, which returns
 * true if the attendee is disabled (cannot be booked or selected in the group booking modal)
 */
export const useIsAttendeeDisabledCallback = (session, attendees) => {
  const [valid] = validate(
    { session, attendees },
    { session: isObj, attendees: isArr }
  )
  if (!valid) return null

  const { isBookable } = useRestrictedAttendeeIds(session?.identifier)
  const isTimeBlocked = useIsTimeBlockedCallback(session, attendees)
  const isRegisteredForDay = useIsRegisteredForDayCallback(
    session?.dayNumber,
    attendees
  )

  // if there is a pending session, that means it's waiting for a submission response,
  // so we don't want any attendees to be bookable during that time
  const pendingSession = useStoreItems(CATEGORIES.PENDING_SESSION)

  return useCallback(
    attendeeId =>
      pendingSession?.identifier ||
      isTimeBlocked(attendeeId) ||
      !isBookable(attendeeId) ||
      !isRegisteredForDay(attendeeId),
    [ isBookable, isTimeBlocked, isRegisteredForDay, pendingSession ]
  )
}
