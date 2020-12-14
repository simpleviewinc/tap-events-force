import { useCallback } from 'react'

/**
 * Checks if an attendee is registered to attend a conference day
 * @param {Number} dayNumber - day to compare against
 * @param {Array<import('SVModels/Attendee').Attendee>} attendees
 * @return {Function} a callback of form (attendeeId) -> boolean. Returns true if
 * the attendee with `attendeeId` is registered to attend the event on the same day
 * as `dayNumber`.
 */
export const useIsRegisteredForDayCallback = (dayNumber, attendees) => {
  return useCallback(
    attendeeId => {
      const attendee = attendees.find(
        att => att.bookedTicketIdentifier === attendeeId
      )
      return attendee?.bookedDays?.includes(dayNumber)
    },
    [ dayNumber, attendees ]
  )
}
