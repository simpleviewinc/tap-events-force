import { Values, ActionTypes } from 'SVConstants'
import { isStr, validate } from '@keg-hub/jsutils'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values

/**
 * Helper for setPendingSession: validates its input
 * @param {string} sessionId
 * @param {Object} pendingData
 */
const isValidInput = sessionId => {
  const [valid] = validate({ sessionId }, { sessionId: isStr })
  return valid
}

/**
 * Sets session identified by sessionid as the pending session in the store.
 * There can only ever be one pending session, since other sessions are put
 * into a disabled state until the pending session is no longer pending.
 * @param {string} sessionId - id of session
 * @example
 * setPendingSession('12')
 */
export const setPendingSession = sessionId => {
  if (!isValidInput(sessionId)) return

  const pendingSession = { identifier: sessionId }

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.PENDING_SESSION,
      items: pendingSession,
    },
  })
}
