import moment from 'moment'
import { sortSessions } from './sortSessions'
import { reduceObj } from 'jsutils'

/**
 * Filters the sessions given a day number
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} dayNumber
 * @param {boolean=} asc - order ascending by name
 * @returns {object} - where key is the hour, value is the array of sessions
 *                   - ex: {6:[], 7:[sessionA, sessionB, etc], 8:[sessionC, etc]}
 */
export const buildHourSessionsMap = (sessions, dayNumber, asc) => {
  // Filter out the sessions not matching the day
  // Group them by hour
  const sessionsMapping = sessions.reduce((mapped, session) => {
    if (session.dayNumber !== dayNumber) return mapped

    const timeStr = moment(session.startDateTimeLocal).format('HH:mm')
    // create an array or append to existing list
    mapped[timeStr] = (mapped[timeStr] || []).concat(session)

    return mapped
  }, {})

  // Sort the mapped sessiosn based on their value
  return reduceObj(sessionsMapping, (key, val, mapping) => {
    mapping[key] = sortSessions(val, asc)
    return mapping
  })
}
