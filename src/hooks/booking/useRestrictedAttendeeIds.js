import { useMemo } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

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
