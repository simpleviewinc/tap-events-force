// import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { dispatch } from '../../store/sessionsStore'

const { CATEGORIES } = Values

/**
 * Called when user selects a session to look at
 * always sets open=true
 * @param {import('SVModels').session} session - session item
 *
 * @returns {void}
 */
export const setActiveSession = session => {
  session.open = true
  // update the active session store
  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.ACTIVE_SESSION,
      item: {
        ...session,
      },
    },
  })
}
