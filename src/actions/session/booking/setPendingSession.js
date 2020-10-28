import { Values, ActionTypes } from 'SVConstants'
import { isStr, isBool, validate } from '@keg-hub/jsutils'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values

/**
 * Sets the pending session in the store. There can only ever be one
 * pending session, since other sessions are put into a disabled state until
 * the pending session is no longer pending.
 * @param {string} sessionId - id of session
 * @param {boolean} pending - true if session is pending
 */
export const setPendingSession = (sessionId, pending = false) => {
  const [valid] = validate(
    { sessionId, pending },
    { sessionId: isStr, pending: isBool }
  )
  if (!valid) return

  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.PENDING_SESSION,
      items: { identifier: pending ? sessionId : null },
    },
  })
}
