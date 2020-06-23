import { keyMap } from 'jsutils'

export const ActionTypes = keyMap(
  [
    'DB_AUTH_CHANGE',
    'DB_DOC_ADDED',
    'DB_DOC_REMOVED',
    'DB_DOC_CHANGED',
    'DB_INIT',
    // session
    'SET_ACTIVE_SESSION',
    'MAP_SESSION_INTERFACE',
  ],
  true
)
