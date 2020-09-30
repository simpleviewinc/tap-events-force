import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Sets the list of ids of attendees who should be put on
 * the waiting list for the session of the active group
 * booking modal.
 * @param {Array<string>} attendeeIds
 */
export const setWaitingList = attendeeIds => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.GROUP_BOOKING,
      key: SUB_CATEGORIES.WAITING_LIST,
      item: attendeeIds,
    },
  })
}
