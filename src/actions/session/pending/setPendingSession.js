import { Values, ActionTypes } from 'SVConstants'
import { isStr, isArr, isObj, validate } from '@keg-hub/jsutils'
import { dispatch } from 'SVStore'
import { emitPendingEvent } from 'SVUtils/pending/emitPendingEvent'
const { CATEGORIES } = Values

/**
 * @param {Object} data
 * @return {boolean} true if the pending data payload is valid
 */
const isValidPendingData = data =>
  isObj(data) &&
  (isArr(data.pendingBookingList) || isArr(data.pendingWaitingList))

/**
 * Helper for setPendingSession: validates its input
 * @param {string} sessionId
 * @param {Object} pendingData
 */
const isValidInput = (sessionId, pendingData) => {
  const [valid] = validate(
    { sessionId, pendingData },
    {
      sessionId: isStr,
      pendingData: isValidPendingData,
    }
  )

  return valid
}

/**
 * Sets the pending session in the store. There can only ever be one
 * pending session, since other sessions are put into a disabled state until
 * the pending session is no longer pending.
 * @param {string} sessionId - id of session
 * @param {object} pendingData - pending booking list and waiting lists
 * @param {Array<string>?} pendingData.bookingList - pending booking list and waiting lists
 * @param {Array<string>?} pendingData.pendingWaitingList - pending booking list and waiting lists
 * @example
 * setPendingSession('12', true)
 */
export const setPendingSession = (sessionId, pendingData = {}) => {
  if (!isValidInput(sessionId, pendingData)) return

  const { pendingBookingList, pendingWaitingList } = pendingData

  const pendingSession = {
    identifier: sessionId,
    ...(pendingBookingList && { pendingBookingList }),
    ...(pendingWaitingList && { pendingWaitingList }),
  }

  emitPendingEvent(pendingSession)

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.PENDING_SESSION,
      items: pendingSession,
    },
  })
}
