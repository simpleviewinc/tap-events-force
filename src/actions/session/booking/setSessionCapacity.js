import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Sets the current capacity of the session in the active group booking modal.
 * This can change when users select or deselect an attendee checkbox
 * @param {*} capacity
 */
export const setSessionCapacity = (capacity = 0) => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.GROUP_BOOKING,
      key: SUB_CATEGORIES.SESSION_CAPACITY,
      item: capacity,
    },
  })
}
