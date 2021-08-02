import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants/values'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Pulls the state of the allow booking from the store and returns it
 *
 * @returns {boolean} - True if the allow booking is active
 */
export const useAllowBookingActive = () => {
  const { settings } = useStoreItems([CATEGORIES.SETTINGS])
  return settings[SUB_CATEGORIES.ALLOW_BOOKING_ACTIVE]
}
