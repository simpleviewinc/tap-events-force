import { FBService } from 'SVServices/firebase'
import { Values, ActionTypes } from 'SVConstants'
import { logData, limbo } from 'jsutils'
import { dispatch } from 'SVStore'

/**
 * Called when adding a new doc to the store
 * @param {string} doc - Doc to be added to the store
 * @param {string} collection - Collection the doc blogs to
 *
 * @returns {void}
 */
export const upsertDoc = async (doc, collection) => {
  collection = collection || doc.collection
  const [ err, updated ] = await limbo(FBService.updateDoc(doc, collection))

  err
    ? logData(err, 'warn')
    : dispatch({
      type: ActionTypes.UPSERT_ITEM,
      payload: {
        category: Values.categories[collection] || 'unknown',
        key: updated.id,
        item: updated,
      },
    })
}
