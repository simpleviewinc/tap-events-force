import { useCallback } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'
import { useBookingTimeConflicts } from 'SVHooks/booking/useBookingTimeConflicts'
import { Values } from 'SVConstants'
import { validate, isObj, isArr } from '@keg-hub/jsutils'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 *
 * @param {import('SVModels/Session').Session} session
 * @param {Array<import('SVModels/Attendee').Attendee>} attendees
 */
const useIsTimeBlockedCallback = (session, attendees) => {
  const agendaSettings = useStoreItems(
    `${CATEGORIES.SETTINGS}.${SUB_CATEGORIES.AGENDA_SETTINGS}`
  )
  const agendaSessions = useStoreItems(CATEGORIES.AGENDA_SESSIONS)
  const timeConflicts = useBookingTimeConflicts(
    session,
    attendees,
    agendaSessions[agendaSettings?.activeDayNumber ?? 1]
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

  return useCallback(
    attendeeId => !isBookable(attendeeId) || isTimeBlocked(attendeeId),
    [ isBookable, isTimeBlocked ]
  )
}
