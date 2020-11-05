import { useMemo } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { validate, isStr } from '@keg-hub/jsutils'

/**
 * Helper for `useRestrictedAttendeeIds`. Builds an
 * `isBookable` function returned by that hook, with validation
 * @param {Array<string>?} restrictedIdsForSession
 */
const getIsBookable = restrictedIdsForSession => {
  return attendeeId => {
    const [valid] = validate({ attendeeId }, { attendeeId: isStr })
    if (!valid) return false
    return (
      restrictedIdsForSession && !restrictedIdsForSession.includes(attendeeId)
    )
  }
}

/**
 * Returns an object with the following properties:
 *  - restrictedAttendeeIds: map of restricted attendee ids by session
 *  - restrictedAttendeeIdsForSession: the attendee ids for this sessionId
 *  - isBookable: a function indicating an attendee (id) can book a given session.
 *                If it returns false, that attendee with that id is restricted from booking.
 * @param {string?} sessionId - id of session - only required if you want helper fn isBookable
 * @return {Object} restricted data
 */
export const useRestrictedAttendeeIds = sessionId => {
  const restrictedAttendeeIds = useStoreItems('restrictedAttendeeIds')
  const restrictedIdsForSession = restrictedAttendeeIds?.[sessionId]
  return useMemo(
    () => ({
      restrictedAttendeeIds,
      restrictedIdsForSession,
      isBookable: getIsBookable(restrictedIdsForSession),
    }),
    [ restrictedAttendeeIds, sessionId ]
  )
}
