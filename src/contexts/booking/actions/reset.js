import { GroupBookingActionTypes } from '../constants/groupBookingActionTypes'

/**
 * Resets the group booking state
 * @param {Function} dispatch - the dispatch function for the reducer
 * @param {Object} nextState - next state of the reducer
 */
export const reset = (dispatch, nextState) => {
  return dispatch?.({
    type: GroupBookingActionTypes.RESET,
    value: nextState,
  })
}
