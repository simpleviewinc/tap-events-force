import { GroupBookingActionTypes } from '../constants/groupBookingActionTypes'

/**
 * Updates the booking or waiting list with the attendee id. Adds
 * or removes the attendee to one of those lists, depending on the list
 * that currently contains it, if any, and if the waiting list is available.
 *
 * Also updates state.capacity and state.modified.*, depending on how
 * a list was updated.
 *
 * @param {Function} dispatch - the dispatch function for the reducer
 * @param {string} attendeeId - attendee id
 */
export const updateSessionBooking = (dispatch, attendeeId) => {
  return dispatch?.({
    type: GroupBookingActionTypes.UPDATE_SESSION_BOOKING,
    value: attendeeId,
  })
}
