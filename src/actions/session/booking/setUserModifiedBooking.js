import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values
import { isStr, isBool, validate } from '@keg-hub/jsutils'

/**
 * Stores the id of a session whose local booking lists have been modified
 * by the user. The session is associated with the active group booking modal
 * in the group booking items store tree.
 *
 * @param {string} sessionId - id of a session
 * @param {boolean} isModified - true if session is modified by user
 */
export const setUserModifiedBooking = (sessionId, isModified) => {
  const [valid] = validate(
    { sessionId, isModified },
    { sessionId: isStr, isModified: isBool }
  )
  if (!valid) return

  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.MODIFIED_SESSION,
      items: { identifier: isModified ? sessionId : null },
    },
  })
}
