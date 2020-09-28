import { isAttendeeRestricted } from './isAttendeeRestricted'

/**
 * Builds a set of restricted attendees for the session (attendees not eligible to book this session)
 * @param {Array<Attendee>} attendees
 * @param {Session} session
 * @return {Set} restricted attendee ids (attendees that can't book the session)
 */
export const buildRestrictedAttendeeSet = (attendees, session) => {
  return attendees.reduce((restricted, attendee) => {
    isAttendeeRestricted(attendee, session) &&
      restricted.add(attendee.bookedTicketIdentifier)
    return restricted
  }, new Set())
}
