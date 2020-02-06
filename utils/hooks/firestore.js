import { useEffect, useState } from 'react'
import { FBService } from 'SVServices'
import { ensureArr } from 'SVUtils'
import { useSelector } from 'react-redux'
import { match, eitherStr, either, eitherObj, isArr, validate, isStr, isObj } from 'jsutils'
import { getCollection, watchCollection } from 'SVActions'

/**
 * Fetches the firestore collection
 * @param {Object | string} paramsOrName - either a params object, or the name of the collection
 * @param {string} params.name - the name of the collection to get
 * @param {boolean} params.subscribe - (optional) if true, useCollection will setup listeners to the collection and store the results in the items store tree.
 * @param {Array} dependencies - (optional) any dependencies that should cause a reload of the hook when changed
 * 
 * @returns the firestore collection, coming from the items store tree. Since the fetch is asynchronous, it will initially return an empty object {}.
 * 
 * @example
 * const events = useCollection({ name: 'events', subscribe: true }, [ someDependency ])
 * 
 * @example
 * const sessions = useCollection(sessions, []) // no subscription here. Fetches the data and inserts into store **once**
 */
export const useCollection = (paramsOrName, dependencies) => {
  const { name, subscribe } = isStr(paramsOrName) 
    ? { name: paramsOrName, subscribe: false }
    : paramsOrName

  useEffect(
    () => {
      subscribe 
        ? watchCollection(name)
        : getCollection(name) 

      return () => { subscribe && FBService.unwatchCollection(name) }
    },
    [ ...(dependencies || []), paramsOrName ] 
  )

  return useSelector(store => store.items[name])
}
