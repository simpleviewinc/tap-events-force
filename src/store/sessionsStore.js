import React, { createContext, useReducer, useContext } from 'react'
import {
  sessionsState,
  usersState,
  settingsState,
  labelsState,
  locationsState,
  modalsState,
} from 'SVReducers/initialStates'
import { items as itemsReducer } from 'SVReducers/items'
import { runPlugins, initializePlugins } from 'SVStore/plugins'

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
  sessionDispatch
    ? sessionDispatch(action)
    : console.error(
      'Session Dispatch is not set yet. Cannot dispatch action ',
      action
    )
}

/**
 * Uses the useContext hook from react to get the combined sessions store
 * @param {Object} params
 * @param {Array<string>} params.paths - item store paths to watch for synchronizing with local storage
 * @returns {sessionsState & settingsState & usersState & labelsState & locationsState & modalsState}
 */
export const useSessionsStore = () => {
  const [ _store, _dispatch ] = useContext(SessionsContext)
  store = _store
  if (!sessionDispatch) sessionDispatch = _dispatch
  return store
}

initializePlugins({ dispatch })
