import React, { createContext, useReducer, useContext, useEffect } from 'react'
import {
  sessionsState,
  usersState,
  settingsState,
  labelsState,
  locationsState,
  modalsState,
} from 'SVReducers/initialStates'
import { items as itemsReducer } from 'SVReducers/items'
import { runPlugins, initializePlugins, LocalStorage } from 'SVStore/plugins'

const rootReducer = (state, action) => {
  const { action: processedAction } = runPlugins({ action })
  return itemsReducer(state, processedAction)
}

const SessionsContext = createContext(null)
/**
 * Wraps the given children with the context provider
 * @param {object} props
 * @property {React.Component} children - children components
 *
 * @returns {React.Component}
 */
export const SessionsProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(rootReducer, {
    ...sessionsState,
    ...usersState,
    ...settingsState,
    ...labelsState,
    ...locationsState,
    ...modalsState,
  })
  return (
    <SessionsContext.Provider value={[ state, dispatch ]}>
      { children }
    </SessionsContext.Provider>
  )
}

let sessionDispatch
let store
export const getStore = () => store
export const getDispatch = () => dispatch
export const dispatch = action => {
  sessionDispatch(action)
}

/**
 * Uses the useContext hook from react to get the combined sessions store
 * @param {Object} params
 * @param {Array<string>} params.paths - item store paths to watch for synchronizing with local storage
 * @returns {sessionsState & settingsState & usersState & labelsState & locationsState & modalsState}
 */
export const useSessionsStore = ({ paths = [] } = {}) => {
  const [ _store, _dispatch ] = useContext(SessionsContext)
  if (!sessionDispatch) sessionDispatch = _dispatch

  // Need to configure and initialize LocalStorage here. Doing so any earlier would
  // throw since sessionDispatch would not be assigned yet, and LocalStorage uses
  // dispatch to sync with the store
  useEffect(() => void LocalStorage.configure({ paths, dispatch }), [])

  store = _store
  return store
}

initializePlugins({ dispatch })
