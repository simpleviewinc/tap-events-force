import { useMemo } from 'react'
import { noOpObj, noPropArr, isStr } from '@keg-hub/jsutils'
import { getTimeFromDate } from 'SVUtils/dateTime'

/**
 * Creates an EPOCH time based on the passed in time argument
 * @param {string} time - Time of the day to create the EPOCH time for
 *
 * @returns {number} - EPOCH time for the passed in time
 */
const getEpochTime = time =>  {
  return Date.parse(`1970/01/01 ${time.replace(/(AM)|(PM)/, '')}`)
}

/**
 * Gets the EPOCH time for a sessions start and end times
 * @param {Object} session - current session to book attendees with
 *
 * @returns {Object} - Contains the sessions start and end times as EPOCH
 */
const parseSessionTimes = ({ startDateTimeLocal, endDateTimeLocal }) => {
  return {
    startBlock: getEpochTime(getTimeFromDate(startDateTimeLocal)),
    endBlock: getEpochTime(getTimeFromDate(endDateTimeLocal))
  }
}

/**
 * Checks if the timeBlock is at or between the start and end blocks
 * @param {string} startEpoch - The start of the current session
 * @param {string} endEpoch - The end of the current session
 * @param {string} checkStartEpoch - The start of the session to be checked
 * @param {string} checkEndEpoch - The end of the session to be checked
 *
 * @returns {boolean} - Is the timeBlock time after the endBlock time
 */
const timeConflict = (startEpoch, endEpoch, checkStartEpoch, checkEndEpoch) => {
  return startEpoch && endEpoch && checkStartEpoch && checkEndEpoch &&
    Boolean((startEpoch < checkEndEpoch) && (checkStartEpoch < endEpoch))
}

/**
 * Gets a list of sessions relative to the start and end time of the passed in session Id
 * @param {Object} daySessions - All sessions for the day
 * @param {string} startEpoch - The start of the current session
 * @param {string} endEpoch - The end of the session to be checked
 * @param {string} sessionId - Id of the current session
 *
 * @returns {Array} - Group of sessions id's relative to the passed in start and end block times
 */
const getRelativeSessions = (daySessions, startEpoch, endEpoch, sessionId) => {
  return (
    (daySessions &&
      daySessions.length &&
      daySessions.reduce((relativeSessions, { sessions, timeBlock }) => {
          sessions &&
          sessions.length &&
          sessions.map(session => {
            const { startBlock:checkStartEpoch, endBlock:checkEndEpoch } = parseSessionTimes(session)

            return session.identifier !== sessionId &&
              timeConflict(startEpoch, endEpoch, checkStartEpoch, checkEndEpoch) &&
              relativeSessions.push(session.identifier)
          })

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
    Boolean(booked) &&
    Boolean(booked.length) &&
    booked.reduce((timeConflict, bookedId) => {
      const bookedIdStr = bookedId?.toString()
      return timeConflict || (sessionIds.includes(bookedIdStr) && bookedIdStr)
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

    conflictId !== false &&
      (conflicts[attendee.bookedTicketIdentifier] = conflictId)

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
  const { identifier: sessionId } = session
  const { startBlock, endBlock } = parseSessionTimes(session)

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
