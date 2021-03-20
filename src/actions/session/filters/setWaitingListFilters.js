import { get, noPropArr } from '@keg-hub/jsutils'
import { getStore, dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Checks if any sessions have a waiting list available
 * Then updates the store base on the result
 * @param {Array.<import('SVModels/session').Session>} sessions
 *
 */
export const setWaitingListFilters = sessions => {
  const { items } = getStore()?.getState()
  sessions = sessions || items?.sessions || noPropArr

  const searchPath = [ 'capacity', 'isWaitingListAvailable' ]
  const waitingListActive = sessions.some(session => get(session, searchPath))

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      item: waitingListActive,
      category: CATEGORIES.SETTINGS,
      key: SUB_CATEGORIES.WAITING_LIST_ACTIVE,
    },
  })
}
