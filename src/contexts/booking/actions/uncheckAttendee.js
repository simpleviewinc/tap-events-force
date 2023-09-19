import { GroupBookingActionTypes } from '../constants/groupBookingActionTypes'

export const uncheckAttendee = (dispatch, attendeeId) => {
  return dispatch?.({
    type: GroupBookingActionTypes.UNCHECK_ATTENDEE,
    value: attendeeId,
  })
}
