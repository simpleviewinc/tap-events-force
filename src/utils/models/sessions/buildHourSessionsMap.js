import { getTimeFromDate } from '../../dateTime/getTimeFromDate'
import { sortSessions } from './sortSessions'

/**
 * @typedef SessionTimeBlock
 * @property {string} timeBlock - the START time of the time block of the sessions
 * @property {Array<Session>} sessions - the sessions that fit inside this time block
 */

/**
 * Bins the sessions into groups by timeblocks
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} dayNumber
 * @param {boolean} isMilitaryTime - is it in militaryTime
 * @param {boolean=} asc - order ascending by name. default true
 * @returns {Array<SessionTimeBlock>} - array of objects containing timeblock and sessions:
 *                    ex: [{timeBlock: '9:00', sessions: [session1, session2]}]
 *
 * NOTE: the sessions arrays in each SessionTimeBlock are NOT sorted. The Sessions component merely
 * displays the sessions it receives as input in the order provided. The consumer can sort sessions however
 * they want.
 */
export const buildHourSessionsMap = (
  sessions,
  dayNumber,
  isMilitaryTime,
  asc = true
) => {
  // 1. Filter out the sessions not matching the day
  // 2. Group the sessions by start block
  // 3. sort the array by the start block
  return sessions
    .reduce((items, session) => {
      if (session.dayNumber !== dayNumber) return items

      const timeBlock = getTimeFromDate(
        session.startDateTimeLocal,
        isMilitaryTime
      )

      // check the session start time
      const mapIndex = items.findIndex(item => timeBlock === item.timeBlock)

      // if the time block already exists in the mapping array, append the session
      // otherwise push a new object to it
      mapIndex >= 0
        ? (items[mapIndex].sessions = sortSessions(
            (items[mapIndex].sessions || []).concat(session),
            asc
          ))
        : items.push({ timeBlock, sessions: [session] })

      return items
    }, [])
    .sort(
      (itemA, itemB) =>
        new Date(`1970/01/01 ${itemA.timeBlock}`) -
        new Date(`1970/01/01 ${itemB.timeBlock}`)
    )
}
