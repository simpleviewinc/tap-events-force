import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants/values'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Pulls the state of the waiting list from the store and returns it
 *
 * @returns {boolean} - True if the waiting list is active
 */
export const useWaitingListActive = () => {
  const { settings } = useStoreItems([CATEGORIES.SETTINGS])
  return settings[SUB_CATEGORIES.WAITING_LIST_ACTIVE]
}
