import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES, SUB_CATEGORIES } = Values
import { isArr, validate } from '@keg-hub/jsutils'

/**
 * Action to set the attendee ids for the current booking list of the active group booking modal
 * @param {Array<string>} attendeeIds
 */
export const setInitialBookingList = attendeeIds => {
  const [valid] = validate({ attendeeIds }, { attendeeIds: isArr })
  if (!valid) return

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.GROUP_BOOKING,
      key: SUB_CATEGORIES.INITIAL_BOOKING_LIST,
      item: attendeeIds,
    },
  })
}
