import { useMemo } from 'react'
import { noOpObj, noPropArr } from '@keg-hub/jsutils'
import { getTimeFromDate } from 'SVUtils/dateTime'

/**
 * Checks if the timeBlock time is after the endBlock time
 * @param {string} endBlock - The end of a session
 * @param {string} tineBlock - The start of a session
 *
 * @returns {boolean} - Is the timeBlock time after the endBlock time
 */
const afterEndBlock = (endBlock, timeBlock) =>
  Date.parse(`1970/01/01 ${timeBlock}`) > Date.parse(`1970/01/01 ${endBlock}`)

/**
 * Gets a list of sessions relative to the start and end time of the passed in session Id
 * @param {Object} daySessions - All sessions for the day
 * @param {string} startBlock - The start of a session
 * @param {string} endBlock - The end of a session
 * @param {string} sessionId - Id of the current session
 *
 * @returns {Array} - Group of sessions id's relative to the passed in start and end block times
 */
const getRelativeSessions = (daySessions, startBlock, endBlock, sessionId) => {
  return (
    (daySessions &&
      daySessions.length &&
      daySessions.reduce((relativeSessions, { sessions, timeBlock }) => {
        ;(timeBlock === startBlock || afterEndBlock(endBlock, timeBlock)) &&
          sessions &&
          sessions.length &&
          sessions.map(
            session =>
              session.identifier !== sessionId &&
              relativeSessions.push(session.identifier)
          )

        return relativeSessions
      }, [])) ||
    noPropArr
  )
}

/**
 * Checks if a time conflict exists
 * @param {Object} booked - Currently booked sessions for an attendee (attendee.bookedSessions)
 * @param {Array} sessionIds - Group of sessions id's found in the getRelativeSessions method
 *
 * @returns {string|boolean} - Conflicting session if a conflict exists or false it no conflict exists
 */
const hasTimeConflict = (booked, sessionIds) => {
  return (
    booked &&
    booked.length &&
    booked.reduce((timeConflict, bookedId) => {
      return timeConflict || (sessionIds.includes(bookedId) && bookedId)
    }, false)
  )
}

/**
 * Loops over all attendees, and checks for time conflicts between currently booked session and relative sessions
 * @param {Array} attendees - Who should be checked for time-conflicts
 * @param {Array} relativeSessions - Group of sessions id's found in the getRelativeSessions method
 *
 * @returns {Object} - Conflicting Object containing attendees ids mapped to conflicting sessions
 */
const getTimeConflicts = (attendees, relativeSessions) => {
  return attendees.reduce((conflicts, attendee) => {
    const conflictId = hasTimeConflict(
      attendee.bookedSessions,
      relativeSessions
    )
    conflictId && (conflicts[attendee.bookedTicketIdentifier] = conflictId)

    return conflicts
  }, {})
}

/**
 * Looks for time-conflicts between the passed in session and an array of attendees
 * @param {Object} session - current session to book attendees with
 * @param {Array} attendees - Who should be checked for time-conflicts
 * @param {Object} daySessions - All sessions for the day
 *
 * @returns {Object|boolean} - Contains key value pair of attendee.bookedTicketIdentifier as the key and conflicting session id as the value
 *                             Return false if no conflicts are found
 */
export const useBookingTimeConflicts = (session, attendees, daySessions) => {
  const {
    startDateTimeLocal: sessionStart,
    endDateTimeLocal: sessionEnd,
    identifier: sessionId,
  } = session
  const startBlock = getTimeFromDate(sessionStart)
  const endBlock = getTimeFromDate(sessionEnd)

  return useMemo(() => {
    const conflicts =
      !sessionId || !attendees.length
        ? noOpObj
        : getTimeConflicts(
          attendees,
          getRelativeSessions(daySessions, startBlock, endBlock, sessionId)
        )

    return Object.keys(conflicts).length ? conflicts : false
  }, [ sessionId, startBlock, endBlock, daySessions, attendees ])
}
