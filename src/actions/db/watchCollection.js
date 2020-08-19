import { logData } from '@ltipton/jsutils'
import { FBService } from 'SVServices/firebase'

/**
 * Called when a collection should be watched for changes
 * @param {string} collection - Collection to watch for changes
 *
 * @returns {void}
 */
export const watchCollection = collection => {
  !collection
    ? logData(
        `A collection name is required to watch a collection!`,
        collection,
        'error'
      )
    : !FBService.watcherUnSubs[collection] &&
      FBService.watchCollection(collection)
}
