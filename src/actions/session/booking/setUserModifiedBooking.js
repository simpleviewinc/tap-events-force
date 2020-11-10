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
 * @param {boolean} waitListModified - true if session is modified by user
 * @param {boolean} bookListModified - true if session is modified by user
 */
export const setUserModifiedBooking = (
  sessionId,
  waitListModified,
  bookListModified
) => {
  const [valid] = validate(
    { sessionId, waitListModified, bookListModified },
    { sessionId: isStr, $default: isBool }
  )
  if (!valid) return

  const isModified = waitListModified || bookListModified

  const items = {
    identifier: isModified ? sessionId : null,
    waitListModified,
    bookListModified,
  }

  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.MODIFIED_SESSION,
      items,
    },
  })
}
