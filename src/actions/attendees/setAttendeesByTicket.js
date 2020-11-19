import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
import { isArrMap, validate } from '@keg-hub/jsutils'
const { INTERNAL_CATEGORIES } = Values

/**
 * stores a map in the store that has organized attendee (ids) by the ticket
 * they are ready to book
 * @param {Object<string, Array<string>>} attendeesByTicketMap - object of ticket ids mapped to arrays of attendee ids
 * @return { void }
 */
export const setAttendeesByTicket = attendeesByTicketMap => {
  let [valid] = validate(
    { attendeesByTicketMap },
    { attendeesByTicketMap: isArrMap }
  )
  if (!valid) return

  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: INTERNAL_CATEGORIES.ATTENDEES_BY_TICKET,
      items: attendeesByTicketMap,
    },
  })
}
