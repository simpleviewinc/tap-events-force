import { useCallback } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useRestrictedAttendeeIds } from 'SVHooks/booking/useRestrictedAttendeeIds'
import { useBookingTimeConflicts } from 'SVHooks/booking/useBookingTimeConflicts'
import { Values } from 'SVConstants'
import { validate, isObj, isArr } from '@keg-hub/jsutils'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 *
 * @param {import('SVModels/').} session
 * @param {*} attendees
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

export const useIsAttendeeDisabledCallback = (session, attendees) => {
  const [valid] = validate(
    { session, attendees },
    { session: isObj, attendees: isArr }
  )
  if (!valid) return

  const { isBookable } = useRestrictedAttendeeIds(session?.identifier)
  const isTimeBlocked = useIsTimeBlockedCallback(session, attendees)

  return useCallback(
    attendeeId => !isBookable(attendeeId) || isTimeBlocked(attendeeId),
    [ isBookable, isTimeBlocked ]
  )
}
