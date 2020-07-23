import { useEffect, useState } from 'react'
import { KeyStore } from 'SVNative/keyStore'
import { ActionTypes } from 'SVConstants'
import { get, set, isObj } from 'jsutils'

/**
 * Synchronizes all redux-store paths in `storePaths` using localStorage
 * @param {Object} store - redux store
 * @param {Function} dispatch - function to dispatch updates to store
 * @param {Array<string>} storePaths
 */
export const useLocalStorage = (store, dispatch, storePaths = []) => {
  const [ loaded, setLoaded ] = useState(false)

  // load paths once on init
  useEffect(() => {
    storePaths.map(path => loadFromLocalStorage(path, KeyStore, dispatch))
    setLoaded(true)
  }, [])

  const dependencies = storePaths.map(path => store[path])

  // store paths whenever they update
  useEffect(() => {
    loaded &&
      storePaths.map(path =>
        storeInLocalStorage(path, KeyStore, get(store, path))
      )
  }, [ dependencies, loaded ])
}

/**
 * Stores a value in localStorage that current exists in the in-memory store (redux/reducers) at the same path
 * @param {string} path - path to value in localStorage and redux store
 * @param {Object} storage - an instance of the Storage class defined in keg-core, with getItem/setItem functions for localStorage
 * @param {*} value - what to store at path
 */
const storeInLocalStorage = async (path, storage, value) => {
  const [category] = path.split('.')
  if (!category) return
  storage.setItem(path, value)
}

/**
 * Loads a path stored in localStorage into the same path for an in-memory store (redux/reducers)
 * @param {string} path - path to value in localStorage and redux store
 * @param {Object} storage - an instance of the Storage class defined in keg-core, with getItem/setItem functions for localStorage
 * @param {Function} dispatch - the function to dispatch updates to the redux store
 */
const loadFromLocalStorage = async (path, storage, dispatch) => {
  const [ category, ...keys ] = path.split('.')
  const localStorageValue = await storage.getItem(path)
  const parsedValue = JSON.parse(localStorageValue)

  if (!parsedValue || !category) return

  const itemUpsertVal = ensureExists({}, keys.slice(1), parsedValue)

  // set the item(s) in the redux store
  keys && keys.length
    ? dispatch({
        type: ActionTypes.UPSERT_ITEM,
        payload: { category, key: keys[0], item: itemUpsertVal },
      })
    : dispatch({
      type: ActionTypes.UPSERT_ITEMS,
      payload: { category, items: parsedValue },
    })
}

/**
 * !!!! REMOVE ONCE THIS IS ADDED TO JSUTILS !!!
 * Ensure Exists - path
 * @param {*} obj
 * @param {*} keyPath
 * @param {*} value
 */
export const ensureExists = (obj = {}, keyPath = [], value) => {
  // base case: if there are no keys left in the path, we just return value
  if (!keyPath.length) {
    return !isObj(obj) ? obj : value
  }

  // check key
  const key = keyPath[0]
  const pathValue = obj[key]
  if (pathValue !== undefined) {
    set(obj, key, buildPath(keyPath.slice(1), value))
  }
  else {
    const nestedObj = isObj(pathValue) ? pathValue : {}
    const ensuredValue = ensureExists(nestedObj, keyPath.slice(1), value)
    set(obj, key, ensuredValue)
  }

  return obj
}
