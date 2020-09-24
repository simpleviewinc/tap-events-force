import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * @returns {Session} the current, active session for the group booking
 */
export const useCurrentSession = () => {
  const currentSessionId = useStoreItems(
    `${CATEGORIES.GROUP_BOOKING}.${SUB_CATEGORIES.CURRENT_SESSION}`
  )
  return useStoreItems(`${CATEGORIES.SESSIONS}.${currentSessionId}`)
}
