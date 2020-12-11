import { useCallback } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'
import { useBookingTimeConflicts } from 'SVHooks/booking/useBookingTimeConflicts'
import { Values } from 'SVConstants'
import { validate, isObj, isArr } from '@keg-hub/jsutils'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Helper for `useIsAttendeeDisabledCallback` that checks for time conflicts
 * @param {import('SVModels/Session').Session} session
 * @param {Array<import('SVModels/Attendee').Attendee>} attendees
 * @returns {Function?} a callback of form (attendeeId) -> Boolean, which returns
 * true if the attendee is timeblocked against `session`
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
 * @param {Number} dayNumber - day to compare against
 * @param {Array<import('SVModels/Attendee').Attendee>} attendees
 * @return {Function} a callback of form (attendeeId) -> boolean. Returns true if
 * the attendee with `attendeeId` is registered to attend the event on the same day
 * as `dayNumber`.
 */
const useIsRegisteredForDayCallback = (dayNumber, attendees) => {
  return useCallback(
    attendeeId => {
      const attendee = attendees.find(
        att => att.bookedTicketIdentifier === attendeeId
      )
      return attendee && attendee.bookedDays?.includes(dayNumber)
    },
    [ dayNumber, attendees ]
  )
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

  return useCallback(
    attendeeId =>
      !isBookable(attendeeId) ||
      isTimeBlocked(attendeeId) ||
      !isRegisteredForDay(attendeeId),
    [ isBookable, isTimeBlocked, isRegisteredForDay ]
  )
}
