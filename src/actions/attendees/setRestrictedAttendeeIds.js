import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values

/**
 * Stores a list of attendee ids that cannot book the sessionId
 * @param {string} sessionId
 * @param {Set<string>} attendeeIds
 */
export const setRestrictedAttendeeIds = (sessionId, attendeeIds) => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.RESTRICTED_ATTENDEE_IDS,
      key: sessionId,
      item: attendeeIds,
    },
  })
}
