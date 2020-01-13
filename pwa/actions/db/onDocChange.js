import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

/**
 * Called when a doc changes from an outside source
 * @param {string} type - ActionType to use when passing to a reducer
 * @param {Object} doc - item the was changed
 *
 * @returns {void}
 */
export const onDocChange = (doc, type=ActionTypes.UPSERT_ITEM) => type && doc && doc.collection && dispatch({
  type,
  payload: {
    category: Values.categories[doc.collection],
    key: doc.id,
    item: doc
  }
})
