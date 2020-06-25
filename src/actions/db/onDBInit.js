import { dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'

/**
 * Called after the firebase DB has been initialized
 * Updates the store, setting DB_INIT to true in the settings category
 * @param {boolean} success - If the DB was initialized
 * @param {string} type - Action to send to the reducer
 *
 * @returns {void}
 */
export const onDBInit = (success, type = ActionTypes.UPSERT_ITEMS) => {
  dispatch({
    type,
    payload: {
      category: Values.categories.settings,
      items: { [type]: success },
    },
  })
}
