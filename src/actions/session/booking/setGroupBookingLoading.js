import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES, SUB_CATEGORIES } = Values
import { isBool, validate } from '@keg-hub/jsutils'

/**
 * Sets the list of ids of attendees who should be put on
 * the waiting list for the session of the active group
 * booking modal.
 * @param {Array<string>} attendeeIds
 */
export const setGroupBookingLoading = isLoading => {
  const [valid] = validate({ isLoading }, { isLoading: isBool })
  if (!valid) return

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.GROUP_BOOKING,
      key: SUB_CATEGORIES.LOADING,
      item: isLoading,
    },
  })
}
