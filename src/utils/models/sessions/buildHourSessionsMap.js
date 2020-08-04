import moment from 'moment'
import { sortSessions } from './sortSessions'
/**
 * Filters & sort the sessions for sessions that start at a given hour
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} hour - any number from 1-24
 * @param {boolean=} asc - whether to order them in ascending or not
 */
const filterSessionByHour = (sessions, hour, asc) => {
  // filter by hour block
  const filteredSessions = sessions.filter(
    session => moment(session.startDateTimeLocal).hour() === hour
  )

  // sort the result
  return sortSessions(filteredSessions, asc)
}

/**
 * Filters the sessions given a day number
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} dayNumber
 * @param {boolean=} asc - order ascending by name
 * @returns {object} - where key is the hour, value is the array of sessions
 *                   - ex: {6:[], 7:[sessionA, sessionB, etc], 8:[sessionC, etc]}
 */
export const buildHourSessionsMap = (sessions, dayNumber, asc) => {
  // filter for sessions on the given day number
  const filteredSessions = sessions.filter(
    session => session.dayNumber == dayNumber
  )

  // 1. loop through possible start session hours
  // 2. filter sessions for each hour and store them in kvp
  // resulting obj looks something like
  let sessionsFilteredByHour = {}
  for (let i = 1; i <= 24; i++) {
    sessionsFilteredByHour[i] = filterSessionByHour(filteredSessions, i, asc)
  }
  return sessionsFilteredByHour
}
