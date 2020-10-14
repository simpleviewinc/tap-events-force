import { setWaitingList } from 'SVActions/session/booking'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useExternalSet } from 'SVHooks/state/useExternalSet'
import { Values } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Returns a set-like interface to the list of attendee ids to be added to the waiting list for the current session
 * @returns {Object} with functions matching a javascript Set.
 * Mutations dispatch actions to the store.
 * @example
 * const waitingList = useWaitingSet()
 * waitingList.add('32') // dispatches 32 to be added to the list
 * waitingList.add('32') // does nothing, since 32 already is present
 */
export const useWaitingSet = () => {
  const waitingArray = useStoreItems(
    `${CATEGORIES.GROUP_BOOKING}.${SUB_CATEGORIES.WAITING_LIST}`
  )
  return useExternalSet(waitingArray, setWaitingList)
}
