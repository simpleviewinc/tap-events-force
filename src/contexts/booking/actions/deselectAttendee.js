import { GroupBookingActionTypes } from '../constants/groupBookingActionTypes'

export const deselectAttendee = (dispatch, attendeeId) => {
  return dispatch?.({
    type: GroupBookingActionTypes.DESELECT_ATTENDEE,
    value: attendeeId,
  })
}
