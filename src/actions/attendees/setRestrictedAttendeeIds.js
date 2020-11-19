import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
import { isArr, isStr, validate } from '@keg-hub/jsutils'
const { INTERNAL_CATEGORIES } = Values

/**
 * Stores a list of attendee ids that cannot book the sessionId
 * @param {string} sessionId - id of the session for which to set the restricted attendee id array
 * @param {Array<string>} attendeeIds - list of attendee ids restricted from booking the session identified by sessionId
 */
export const setRestrictedAttendeeIds = (sessionId, attendeeIds) => {
  const [valid] = validate(
    { sessionId, attendeeIds },
    { sessionId: isStr, attendeeIds: isArr }
  )
  if (!valid) return

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: INTERNAL_CATEGORIES.RESTRICTED_ATTENDEE_IDS,
      key: sessionId,
      item: attendeeIds,
    },
  })
}
