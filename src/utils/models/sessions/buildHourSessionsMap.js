import moment from 'moment'
import { sortSessions } from './sortSessions'
import { mapObj } from 'jsutils'

/**
 * Filters the sessions given a day number
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} dayNumber
 * @param {boolean=} asc - order ascending by name
 * @returns {object} - where key is the hour, value is the array of sessions
 *                   - ex: {6:[], 7:[sessionA, sessionB, etc], 8:[sessionC, etc]}
 */
export const buildHourSessionsMap = (sessions, dayNumber, asc) => {
  // 1. filter for sessions on the given day number
  const filteredSessions = sessions.filter(
    session => session.dayNumber == dayNumber
  )

  // 2. start Mapping by start time HH:mm
  const sessionsMapping = {}
  filteredSessions.map(session => {
    const timeStr = moment(session.startDateTimeLocal).format('HH:mm')
    // create an array or append to existing list
    sessionsMapping[timeStr] = (sessionsMapping[timeStr] || []).concat(session)
  })

  // 3. sort results
  mapObj(sessionsMapping, (key, val) => {
    sessionsMapping[key] = sortSessions(val, asc)
  })

  return sessionsMapping
}
