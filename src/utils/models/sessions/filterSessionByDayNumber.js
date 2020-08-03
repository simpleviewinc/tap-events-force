import moment from 'moment'
import { get } from 'jsutils'

/**
 * Filters the sessions for sessions that start at a given hour
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} hour - any number from 1-24
 * @param {boolean} asc - whether to order them in ascending or not
 */
const filterSessionByHour = (sessions, hour, asc = true) => {
  // filter by hour block
  const filteredSessions = sessions
    .filter(session => moment(session.startDateTimeLocal).hour() === hour)
    .sort((sessionA, sessionB) => {
      // get name property for sessions
      const nameA = get(sessionA, 'name', '').toLowerCase()
      const nameB = get(sessionB, 'name', '').toLowerCase()
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
    })
  console.log({ filteredSessions })
  return filteredSessions
  // order by name
}

/**
 * Filters the sessions given a day number
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} dayNumber
 * @returns {object} - where key is the hour, value is the array of sessions
 *                   - ex: {6:[], 7:[sessionA, sessionB, etc], 8:[sessionC, etc]}
 */
export const filterSessionByDayNumber = (sessions, dayNumber) => {
  // filter for sessions on the given day number
  const filteredSessions = sessions.filter(
    session => session.dayNumber === dayNumber
  )

  // 1. loop through possible start session hours
  // 2. filter sessions for each hour and store them in kvp
  // resulting obj looks something like
  let sessionsFilteredByHour = {}
  for (let i = 1; i < 24; i++) {
    sessionsFilteredByHour[i] = filterSessionByHour(filteredSessions, i)
  }
  return sessionsFilteredByHour
}
