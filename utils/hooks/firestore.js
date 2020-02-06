import { useEffect } from 'react'
import { FBService } from 'SVServices'
import { useSelector } from 'react-redux'
import { validate, isStr, isObj, get } from 'jsutils'
import { getCollection, watchCollection } from 'SVActions'

/**
 * Fetches the firestore collection
 * @param {Object} params 
 * @param {string} params.name - the name of the collection
 * @param {boolean} params.subscribe - (optional) if true, useCollection will setup listeners to the collection and store the results in the items store tree.
 * @param {Array} dependencies - (optional) dependencies that should cause a reload of the hook when changed.
 * @returns {Object} the firestore collection, coming from the items store tree.
 * Since the fetch is asynchronous, it will initially return the initial state for this collection (@see reducers/initialStates/items)
 * 
 * @example
 * const events = useCollection({ name: 'events', subscribe: true }, [ someDependency ])
 * 
 * @example
 * const sessions = useCollection({ name: 'sessions' }, []) // no subscription here. Fetches the data and inserts into store **once**
 */
export const useCollection = (params, dependencies=[]) => {
  const [ valid ] = validate(
    { params, name: get(params, 'name') },
    { params: isObj, name: isStr }
  )
  if (!valid) return

  const { name, subscribe=false } = params

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
