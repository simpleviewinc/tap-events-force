import { FBService } from 'SVServices/firebase'
import { ActionTypes } from 'SVConstants'
import { logData, limbo } from 'jsutils'
import { dispatch } from 'SVStore'

/**
 * Called when a doc should be removed from the store
 * @param {string} docId - ID of the doc to be removed
 * @param {string} collection - Collection the doc blogs to
 *
 * @returns {void}
 */
export const removeDoc = async (docId, collection) => {
  if (!docId || !collection)
    return logData(
      `A doc id and the docs collection are requried to remove a doc!`,
      docId,
      collection,
      'warn'
    )

  const [err] = await limbo(FBService.removeDoc(docId, collection))

  err
    ? logData(err, 'warn')
    : dispatch({
      type: ActionTypes.REMOVE_ITEM,
      payload: {
        category: collection,
        key: docId,
      },
    })
}
