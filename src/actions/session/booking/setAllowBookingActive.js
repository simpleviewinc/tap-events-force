import { get, noPropArr } from '@keg-hub/jsutils'
import { getStore, dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Checks if any sessions have allow booking set to true
 * Then updates the store base on the result
 * @param {Array.<import('SVModels/session').Session>} sessions
 *
 */
export const setAllowBookingActive = sessions => {
  const { items } = getStore()?.getState()
  sessions = sessions || items?.sessions || noPropArr

  const searchPath = [ 'allowBooking' ]
  const allowBookingActive = sessions.some(session => get(session, searchPath))

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      item: allowBookingActive,
      category: CATEGORIES.SETTINGS,
      key: SUB_CATEGORIES.ALLOW_BOOKING_ACTIVE,
    },
  })
}
