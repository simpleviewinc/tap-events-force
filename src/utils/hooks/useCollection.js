import { useEffect } from 'react'
import { FBService } from 'SVServices'
import { useSelector } from 'react-redux'
import { validate, isStr, isObj, eitherObj, isArr } from 'jsutils'
import { getCollection,  } from 'SVActions/db/getCollection'
import { watchCollection } from 'SVActions/db/watchCollection'

/**
 * Fetches the firestore collection
 * @param {Object | String } params - either a param object or the name of the collection
 * @param {string} params.name - the name of the collection
 * @param {boolean} params.subscribe - (optional, true by default) if true, useCollection will setup listeners to the collection and store the results in the items store tree.
 * @param {Array} dependencies - (optional) dependencies that should cause a reload of the hook when changed.
 * @returns {Object} the firestore collection, coming from the items store tree.
 * Since the fetch is asynchronous, it will initially return the initial state for this collection (@see reducers/initialStates/items)
 * 
 * @example
 * const events = useCollection('events', [ someDependency ]) // this fetches events and subscribes to any changes
 * 
 * @example
 * const sessions = useCollection({ name: 'sessions', subscribe: false }, []) // no subscription here. Fetches the data and inserts into store **once**
 */
export const useCollection = (params, dependencies=[]) => {
  const [ valid ] = validate(
    { dependencies, params },
    { dependencies: isArr, params: p => isStr(p) || isObj(p) }
  )
  if (!valid) return

  const { name, subscribe=true } = eitherObj(params, { name: params })

  useEffect(
    () => {
      subscribe 
        ? watchCollection(name)
        : getCollection(name) 

      return () => { subscribe && FBService.unwatchCollection(name) }
    },
    [ ...dependencies, name ]
  )

  // return the collection results from the store
  return useSelector(store => store.items[name])
}
