import { GroupBookingActionTypes } from '../constants/groupBookingActionTypes'

export const checkAttendee = (
  dispatch,
  attendeeId,
  isAttendeeDisabledCallback
) => {
  return dispatch?.({
    type: GroupBookingActionTypes.CHECK_ATTENDEE,
    value: {
      attendeeId: attendeeId,
      isAttendeeDisabledCallback: isAttendeeDisabledCallback,
    },
  })
}
