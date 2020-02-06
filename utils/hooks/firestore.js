import { useEffect } from 'react'
import { FBService } from 'SVServices'
import { useSelector } from 'react-redux'
import { eitherObj, isArr, validate, isStr } from 'jsutils'
import { getCollection, watchCollection } from 'SVActions'

/**
 * Fetches the firestore collection
 * @param {string} name - either a params object, or the name of the collection
 * @param {Object || Array} optionsOrDependencies - (optional) if an object, then the config options for the fetch. If an array, then the dependencies for hook
 * @param {boolean} optionsOrDependencies.subscribe - (optional) if true, useCollection will setup listeners to the collection and store the results in the items store tree.
 * @param {Array} otherDependencies - (optional) dependencies that should cause a reload of the hook when changed. Only used if optionsOrDependencies isn't an array.
 * 
 * @returns the firestore collection, coming from the items store tree.
 * Since the fetch is asynchronous, it will initially return the initial state for this collection (@see reducers/initialStates/items)
 * 
 * @example
 * const events = useCollection('events', { subscribe: true }, [ someDependency ])
 * 
 * @example
 * const sessions = useCollection('sessions', []) // no subscription here. Fetches the data and inserts into store **once**
 */
export const useCollection = (name, optionsOrDependencies, otherDependencies) => {
  const [ valid ] = validate({ name }, { name: isStr })
  if (!valid) return

  const { subscribe=false } = eitherObj(optionsOrDependencies, {}) 

  // the hook should reload if the collection name changes, or if any of the caller's passed-in dependencies changed
  const dependencies = mergeDependencies(name, optionsOrDependencies, otherDependencies)

  useEffect(
    () => {
      subscribe 
        ? watchCollection(name)
        : getCollection(name) 

      return () => { subscribe && FBService.unwatchCollection(name) }
    },
    dependencies
  )

  // return the collection results from the store
  return useSelector(store => store.items[name])
}

// helper for useCollection that combines dependencies for a hook into a single array
const mergeDependencies = (name, optionsOrDependencies, otherDependencies) => [
  name,
  ...( eitherArr(optionsOrDependencies, otherDependencies) || [] ),
]

/**
 * Returns a if it is an Array, else returns b. Remove once added to jsutils
 * @param {*} a 
 * @param {*} b 
 */
const eitherArr = (a, b) => isArr(a) ? a : b
