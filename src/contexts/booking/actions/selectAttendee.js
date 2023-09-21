import { GroupBookingActionTypes } from '../constants/groupBookingActionTypes'

export const selectAttendee = (
  dispatch,
  attendeeId,
  isAttendeeDisabledCallback
) => {
  return dispatch?.({
    type: GroupBookingActionTypes.SELECT_ATTENDEE,
    value: {
      attendeeId: attendeeId,
      isAttendeeDisabledCallback: isAttendeeDisabledCallback,
    },
  })
}
