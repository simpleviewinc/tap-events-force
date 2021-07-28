import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants/values'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Pulls the state of the waiting list from the store and returns it
 *
 * @returns {boolean} - True if the waiting list is active
 */
export const useAllowBookingActive = () => {
  const { settings } = useStoreItems([CATEGORIES.SETTINGS])
  return settings[SUB_CATEGORIES.ALLOW_BOOKING_ACTIVE]
}
