import { tapState } from './initialStates/tap'
import { ActionTypes } from 'SVConstants'

const initialState = { ...tapState }

export const tap = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SESSIONS_INIT:
    return { ...state, initialized: action.initialized }
  default:
    return state
  }
}
