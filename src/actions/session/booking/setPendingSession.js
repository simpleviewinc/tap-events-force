import { Values, ActionTypes } from 'SVConstants'
import { isStr, isBool, isObj, validate } from '@keg-hub/jsutils'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values

/**
 * Sets the pending session in the store. There can only ever be one
 * pending session, since other sessions are put into a disabled state until
 * the pending session is no longer pending.
 * @param {string} sessionId - id of session
 * @param {boolean} pending - true if session is pending
 */
export const setPendingSession = (
  sessionId,
  pending = false,
  pendingData = {}
) => {
  const { pendingBookingList, pendingWaitingList } = pendingData

  const [valid] = validate(
    { sessionId, pending, pendingData },
    { sessionId: isStr, pending: isBool, pendingData: isObj }
  )
  if (!valid) return

  const pendingSession = {
    identifier: pending ? sessionId : null,
    ...(pending && pendingBookingList && { pendingBookingList }),
    ...(pending && pendingWaitingList && { pendingWaitingList }),
  }

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.PENDING_SESSION,
      items: pendingSession,
    },
  })
}
