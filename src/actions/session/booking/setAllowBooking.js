import { noPropArr } from '@keg-hub/jsutils'
import { getStore, dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Checks if any sessions have allow booking set to true
 * Then updates the store base on the result
 * @param {Array.<import('SVModels/session').Session>} sessions
 *
 */
export const setAllowBooking = sessions => {
  const { items } = getStore()?.getState()
  sessions = sessions || items?.sessions || noPropArr

  const allowBooking = sessions.some(session => session?.allowBooking)

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      item: allowBooking,
      category: CATEGORIES.SETTINGS,
      key: SUB_CATEGORIES.ALLOW_BOOKING,
    },
  })
}
