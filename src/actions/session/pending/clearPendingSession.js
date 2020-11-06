import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
import { emitPendingEvent } from 'SVUtils/pending/emitPendingEvent'
const { CATEGORIES } = Values

/**
 * Clears the pending session in the store, if one is set.
 * This is done by setting the "identifier" property to null.
 * @example
 * clearPendingSession()
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