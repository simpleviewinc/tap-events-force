import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES, SUB_CATEGORIES } = Values
import { isBool, validate } from '@keg-hub/jsutils'

/**
 * Stores the id of the session associated with the active group booking modal
 * in the group booking items store tree
 * @param {string} sessionId - id of a session
 */
export const setConsumerModifiedBooking = isModified => {
  const [valid] = validate({ isModified }, { isModified: isBool })
  if (!valid) return

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.GROUP_BOOKING,
      key: SUB_CATEGORIES.IS_MODIFIED_BY_CONSUMER,
      item: isModified,
    },
  })
}
