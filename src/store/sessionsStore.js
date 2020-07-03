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

const SessionsContext = createContext(null)
/**
 * Wraps the given children with the context provider
 * @param {object} props
 * @property {React.Component} children - children components
 *
 * @returns {React.Component}
 */
export const SessionsProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(itemsReducer, {
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
  console.log({ sessionDispatch })
  sessionDispatch(action)
}

/**
 * Uses the useContext hook from react to get the combined sessions store
 *
 * @returns {sessionsState & settingsState & usersState & labelsState & locationsState & modalsState}
 */
export const useSessionsStore = () => {
  const [ _store, _dispatch ] = useContext(SessionsContext)
  if (!sessionDispatch) sessionDispatch = _dispatch
  store = _store
  return store
}
