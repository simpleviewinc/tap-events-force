import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values

/**
 * stores a map in the store that has organized attendee (ids) by the ticket
 * they are ready to book
 * @param {Object<string, Array<string>} attendeesByTicketMap
 */
export const setAttendeesByTicket = attendeesByTicketMap => {
  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.ATTENDEES_BY_TICKET,
      items: attendeesByTicketMap,
    },
  })
}
