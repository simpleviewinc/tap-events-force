import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { validate, isStr, isObj, isNum } from 'jsutils'

/**
 * Called when a doc changes from an outside source
 * @param {Object} doc - the doc data that was changed
 * @param {string} type - ActionType to use when passing to a reducer
 *
 * @returns {void}
 */
export const onDocChange = (doc, type=ActionTypes.UPSERT_ITEM) => {
  const [ success ] = validate(
    { type, doc, id: doc.id, collection: doc.collection },
    { $default: isStr, doc: isObj, id: isNum },
  )
  if (!success) return

  return dispatch({
    type,
    payload: {
      category: Values.categories[doc.collection],
      key: doc.id,
      item: doc
    },
  })
}
