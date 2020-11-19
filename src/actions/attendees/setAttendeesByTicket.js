import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
import { isArrMap, validate, noOpObj } from '@keg-hub/jsutils'
const { CATEGORIES } = Values

/**
 * Checks if the attendeesByTicketMap exists and it's a valid isArrMap
 * <br/>If it does not exist, it just returns an empty object
 * <br/>If it exists, but it's not a valid isArrMap, then it fails validation
 * @param {Object<string, Array<string>>} attendeesByTicketMap - object of ticket ids mapped to arrays of attendee ids
 * @return {Object|boolean} - Valid attendeesByTicketMap or false
 */
const validateTicketMap = attendeesByTicketMap => {
  const [valid] = attendeesByTicketMap
    ? validate({ attendeesByTicketMap }, { attendeesByTicketMap: isArrMap })
    : [true]

  return valid ? attendeesByTicketMap || noOpObj : false
}

/**
 * stores a map in the store that has organized attendee (ids) by the ticket
 * they are ready to book
 * @param {Object<string, Array<string>>} attendeesByTicketMap - object of ticket ids mapped to arrays of attendee ids
 * @return { void }
 */
export const setAttendeesByTicket = attendeesByTicketMap => {
  const validTicketMap = validateTicketMap(attendeesByTicketMap)

  validTicketMap &&
    dispatch({
      type: ActionTypes.SET_ITEMS,
      payload: {
        category: CATEGORIES.ATTENDEES_BY_TICKET,
        items: validTicketMap,
      },
    })
}
