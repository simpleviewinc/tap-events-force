import React, { createContext, useReducer, useContext } from 'react'
import {
  sessionsState,
  usersState,
  settingsState,
  labelsState,
  locationsState,
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
  })
  return (
    <SessionsContext.Provider value={[ state, dispatch ]}>
      { children }
    </SessionsContext.Provider>
  )
}

export let dispatch
/**
 * Uses the useContext hook from react to get the combined sessions store
 *
 * @returns {sessionsState & settingsState & usersState & labelsState & locationsState}
 */
export const useSessionsStore = () => {
  const [ store, _dispatch ] = useContext(SessionsContext)
  if (!dispatch) dispatch = _dispatch

  return store
}
