import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Action to set the attendee ids for the current booking list of the active group booking modal
 * @param {Array<string>} attendeeIds
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
