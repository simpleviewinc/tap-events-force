import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { validate, isStr, isObj } from 'jsutils'

/**
 * Called when a doc changes from an outside source
 * @param {string} type - ActionType to use when passing to a reducer
 * @param {Object} doc - item the was changed
 *
 * @returns {void}
 */
export const onDocChange = (collectionName, doc, id, type=ActionTypes.UPSERT_ITEM) => {
  const [ success ] = validate(
    { collectionName, type, doc, id },
    { $default: isStr, doc: isObj },
  )
  if (!success) return

  return dispatch({
    type,
    payload: {
      category: Values.categories[collectionName],
      key: doc.id,
      item: doc
    },
  })
}
