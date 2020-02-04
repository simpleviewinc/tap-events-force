import { useEffect, useState } from 'react'
import { FBService } from 'SVServices'
import { ensureArr } from 'SVUtils'

/**
 * Pulls down the data for the collections and listens for changes. Access each collection in the `items` store tree
 * @param {string | Array<string>} collections - either a single collection name, or an array of collections, to watch
 * @param {Array} dependencies - any dependencies that should cause a reload of the hook when changed
 */
export const useFirestoreWatch = (collections, dependencies=[]) => {
  const sources = ensureArr(collections)

  useEffect(() => {

    // watch each collection. This will initially pull down any data
    sources.map(src => FBService.watchCollection(src))

    // on unmount -- only matters if dependencies isn't an empty array
    return () => sources.map(src => FBService.unwatchCollection(src))

  }, dependencies)
}

/**
 * Fetches for the firestore collection **once**
 * @returns the result of the fetch. Since the fetch is asynchronous, it will initially return an empty object {}
 * @param {string} collection 
 * @param {Array} dependencies 
 */
export const useCollection = (collection, dependencies=[]) => {
  const [ result, setResult ] = useState({})

  const fetch = async () => {
    const docs = await FBService.getCollection(collection)
    setResult(docs)
  }

  useEffect(
    () => void fetch(),
    dependencies
  )

  return result
}
