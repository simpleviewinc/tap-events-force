import { buildRestrictedAttendeeSet } from 'SVUtils/models/attendees'
import { setRestrictedAttendeeIds } from './setRestrictedAttendeeIds'

/**
 * Builds and sets in the items store the restricted attendees array for each session
 * @param {Array<Session>} sessions
 * @param {Array<import('SVModels/attendee').Attendee>}  attendees
 * @return {void}
 */
export const initRestrictedAttendees = (sessions, attendees) => {
  sessions.map(session => {
    const restrictedAttendeeIds = buildRestrictedAttendeeSet(attendees, session)
    setRestrictedAttendeeIds(
      session.identifier,
      Array.from(restrictedAttendeeIds)
    )
  })
}
