import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Tap override of app init action, which loads values from local storage, then
 * dispatches the init value
 */
export const setBookingList = attendeeIds => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.GROUP_BOOKING,
      key: SUB_CATEGORIES.BOOKING_LIST,
      item: attendeeIds,
    },
  })
}
