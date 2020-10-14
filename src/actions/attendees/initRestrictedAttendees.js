import { buildRestrictedAttendeeSet } from 'SVUtils/models/attendees'
import { setRestrictedAttendeeIds } from './setRestrictedAttendeeIds'
import { isArr, validate } from '@keg-hub/jsutils'

/**
 * Builds and sets in the items store the restricted attendees array for each session
 * @param {Array<Session>} sessions - all the sessions to consider
 * @param {Array<import('SVModels/attendee').Attendee>}  attendees - list of attendees to include in the restricted attendee set
 * @return {void}
 */
export const initRestrictedAttendees = (sessions, attendees) => {
  const [valid] = validate({ sessions, attendees }, { $default: isArr })
  if (!valid) return

  sessions.map(session => {
    const restrictedAttendeeIds = buildRestrictedAttendeeSet(attendees, session)
    setRestrictedAttendeeIds(
      session.identifier,
      Array.from(restrictedAttendeeIds)
    )
  })
}
