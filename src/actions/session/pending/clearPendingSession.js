import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
import { emitPendingEvent } from 'SVUtils/pending/emitPendingEvent'
const { CATEGORIES } = Values

/**
 * Sets the pending session in the store. There can only ever be one
 * pending session, since other sessions are put into a disabled state until
 * the pending session is no longer pending.
 * @param {string} sessionId - id of session
 * @param {boolean} pending - true if session is pending
 * @example
 * setPendingSession('12', true)
 */
export const clearPendingSession = () => {
  const pendingSession = { identifier: null }

  emitPendingEvent(pendingSession)

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.PENDING_SESSION,
      items: pendingSession,
    },
  })
}
