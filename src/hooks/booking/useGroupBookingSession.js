import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useSelector, shallowEqual } from 'react-redux'
import { Values } from 'SVConstants'
import { get } from '@keg-hub/jsutils'

const { CATEGORIES, SUB_CATEGORIES } = Values

const getSessionById = (store, id) => {
  const category = get(store, `items.${CATEGORIES.SESSIONS}`)
  return category?.find(session => session?.identifier === id)
}

/**
 * @returns {Session} the current, active session for the group booking
 */
export const useGroupBookingSession = () => {
  const currentSessionId = useStoreItems(
    `${CATEGORIES.GROUP_BOOKING}.${SUB_CATEGORIES.CURRENT_SESSION}`
  )
  return useSelector(
    store => getSessionById(store, currentSessionId),
    shallowEqual
  )
}
