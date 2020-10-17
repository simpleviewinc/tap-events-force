import { useMemo } from 'react'
import { noOpObj, reduceObj, noPropArr } from '@keg-hub/jsutils'
import { getTimeFromDate, parseDate } from 'SVUtils/dateTime'

const afterEndBlock = (endBlock, timeBlock) => Date.parse(`1970/01/01 ${timeBlock}`) > Date.parse(`1970/01/01 ${endBlock}`)

const getRelativeSessions = (daySessions, startBlock, endBlock, sessionId) => {
  return daySessions &&
    daySessions.length &&
    daySessions.reduce((relativeSessions, { sessions, timeBlock }) => {
      (timeBlock === startBlock || afterEndBlock(endBlock, timeBlock)) &&
        sessions &&
        sessions.length &&
        sessions.map(session => session.identifier !== sessionId && relativeSessions.push(session.identifier))

      return relativeSessions
    }, []) || noPropArr
}

const hasTimeConflict = (booked, sessionIds) => {
  return booked &&
    booked.length &&
    booked.reduce((timeConflict, bookedId) => {
      return timeConflict || sessionIds.includes(bookedId) && bookedId
    }, false)
}

export const useBookingTimeConflicts = (session, attendees, daySessions) => {

  const { startDateTimeLocal:sessionStart, endDateTimeLocal:sessionEnd, identifier:sessionId } = session
  const startBlock = getTimeFromDate(sessionStart)
  const endBlock = getTimeFromDate(sessionEnd)

  return useMemo(() => {
    if(!session || !attendees.length) return noOpObj

    const relativeSessions = getRelativeSessions(daySessions, startBlock, endBlock, sessionId)

    return attendees.reduce((conflicts, attendee) => {
      const sessionConflictId = hasTimeConflict(attendee.bookedSessions, relativeSessions)
      conflicts[attendee.bookedTicketIdentifier] = sessionConflictId

      return conflicts
    }, {})

  }, [ sessionId, startBlock, endBlock, daySessions, attendees ])
}