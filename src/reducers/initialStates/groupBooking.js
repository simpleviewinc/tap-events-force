import { Values } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * group booking state
 */
export const groupBookingState = {
  [CATEGORIES.GROUP_BOOKING]: {
    [SUB_CATEGORIES.BOOKING_LIST]: [],
    [SUB_CATEGORIES.WAITING_LIST]: [],
    [SUB_CATEGORIES.INITIAL_BOOKING_LIST]: [],
    [SUB_CATEGORIES.INITIAL_WAITING_LIST]: [],
    [SUB_CATEGORIES.SESSION_CAPACITY]: null,
    [SUB_CATEGORIES.CURRENT_SESSION]: null,
    [SUB_CATEGORIES.LOADING]: false,
  },
}
