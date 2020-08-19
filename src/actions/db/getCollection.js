import { logData, limbo } from '@ltipton/jsutils'
import { FBService } from 'SVServices/firebase'
import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

/**
 * Gets all the docs for a collection
 * @param {*} collection - Collection to get the docs for
 * @returns {void}
 */
export const getCollection = async collection => {
  if (!collection)
    return logData(
      `A collection name is required to watch a collection!`,
      collection,
      'error'
    )

  const [ err, docs ] = await limbo(FBService.getCollection(collection))

  err
    ? logData(err, 'warn')
    : dispatch({
      type: ActionTypes.UPSERT_ITEMS,
      payload: {
        category: Values.categories[collection] || 'unknown',
        items: docs,
      },
    })
}
