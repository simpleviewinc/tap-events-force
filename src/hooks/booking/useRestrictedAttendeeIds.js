import { useMemo } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

/**
 * Returns an object with the following properties:
 *  - restrictedAttendeeIds: map of restricted attendee ids by session
 *  - restrictedAttendeeIdsForSession: the attendee ids for this sessionId
 *  - isBookable: a function indicating an attendee can book a given session. If it returns false, that attendee is restricted from booking.
 * @param {string} sessionId - id of session
 * @return {Object} restricted data
 */
export const useRestrictedAttendeeIds = sessionId => {
  const restrictedAttendeeIds = useStoreItems('restrictedAttendeeIds')
  const restrictedIdsForSession = restrictedAttendeeIds?.[sessionId]
  return useMemo(
    () => ({
      restrictedAttendeeIds,
      restrictedIdsForSession,
      isBookable: id =>
        restrictedIdsForSession && !restrictedIdsForSession.includes(id),
    }),
    [ restrictedAttendeeIds, sessionId ]
  )
}
