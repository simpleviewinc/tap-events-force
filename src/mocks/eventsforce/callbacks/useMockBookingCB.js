import {
  validate,
  isArr,
  isFunc,
  isBool,
  isNum,
  getURLParam,
  isStr,
} from '@keg-hub/jsutils'

const isSet = str => Boolean(str) && str !== ''
const alertIsSet = mockData => {
  return isSet(mockData?.alert?.title) && isSet(mockData?.alert?.message)
}

/**
 * Simulates a consumer props-update that would follow a booking request,
 * updating attendees to match the pending book-list and wait-list ids
 * @param {Array<Attendee>} attendees
 * @param {string} sessionId
 * @param {Object} bookingData
 * @return {Array<Attendee>} attendee list updated with new booked and wait-listed sessions
 */
const updateAttendees = (attendees, sessionId, { bookedIds, waitIds }) => {
  return attendees.map(att => ({
    ...att,
    bookedSessions: bookedIds?.includes(att.bookedTicketIdentifier)
      ? Array.from(new Set([ ...(att.bookedSessions || []), sessionId ]))
      : att.bookedSessions?.filter(id => !bookedIds || id !== sessionId),
    waitingListSessions: waitIds?.includes(att.bookedTicketIdentifier)
      ? Array.from(new Set([ ...(att.waitingListSessions || []), sessionId ]))
      : att.waitingListSessions?.filter(id => !waitIds || id !== sessionId),
  }))
}

/**
 * Simulates a consumer props-update that would follow a booking request, updating
 * sessions to match the new updatedRemainingPlaces and updatedRemainingWaitingPlaces
 * @param {Array<Session>} sessions - current state's sessions
 * @param {String} sessionId - id of session being updated
 * @param {Number} updatedRemainingPlaces - next value of session's capacity.remainingPlaces
 * @param {Number} updatedRemainingWaitingPlaces - next value of session's capacity.waitingListRemainingPlaces
 * @return {Array<Session>}
 */
const updateSessions = (
  sessions,
  sessionId,
  updatedRemainingPlaces,
  updatedRemainingWaitingPlaces
) => {
  return sessions.reduce((allSessions, session) => {
    const { capacity, identifier } = session
    // update the session being modified with new capacities
    if (identifier === sessionId) {
      capacity.remainingPlaces =
        capacity.remainingPlaces !== undefined
          ? updatedRemainingPlaces
          : undefined
      capacity.waitingListRemainingPlaces =
        capacity.waitingListRemainingPlaces !== undefined
          ? updatedRemainingWaitingPlaces
          : undefined
    }
    return [ ...allSessions, session ]
  }, [])
}

/**
 * Updates the mock state for the app when run locally in development. This is not used at all in production.
 * @param {Function} setMockData - setter for mock input to Sessions component
 * @param {String} sessionId - id of session being updated
 * @param {Object} attendeeIds - next array of attendees for the booking or waiting list
 * @param {Boolean} isBookingCb - if true, update the booking list, else the waiting list
 */
const updateMockState = (setMockData, sessionId, attendeeIds, isBookingCb) => {
  setMockData(current => {
    const nextAttendees = updateAttendees(current.attendees, sessionId, {
      bookedIds: isBookingCb ? attendeeIds : null,
      waitIds: !isBookingCb ? attendeeIds : null,
    })
    const foundSession = current.sessions.find(
      session => session.identifier === sessionId
    )
    const isBooked = att => att?.bookedSessions?.includes(sessionId)
    const isWaiting = att => att?.waitingListSessions?.includes(sessionId)

    // get the next state's remaining places for the session
    const currentAttendeesForSessionBookingList = current.attendees.filter(
      isBooked
    )
    const nextAttendeesForSessionBookingList = nextAttendees.filter(isBooked)
    const bookingDiff =
      nextAttendeesForSessionBookingList.length -
      currentAttendeesForSessionBookingList.length
    const updatedRemainingPlaces =
      foundSession.capacity.remainingPlaces - bookingDiff

    // get the next state's remaining waiting list places for the session
    const currentAttendeesForSessionWaitingList = current.attendees.filter(
      isWaiting
    )
    const nextAttendeesForSessionWaitingList = nextAttendees.filter(isWaiting)
    const waitingDiff =
      nextAttendeesForSessionWaitingList.length -
      currentAttendeesForSessionWaitingList.length
    const updatedRemainingWaitingPlaces =
      foundSession.capacity.waitingListRemainingPlaces - waitingDiff

    // get next state's sessions
    const nextSessions = updateSessions(
      current.sessions,
      sessionId,
      updatedRemainingPlaces,
      updatedRemainingWaitingPlaces
    )

    // return the current state with updates applied
    return {
      ...current,
      alert: {},
      attendees: !alertIsSet(current) ? nextAttendees : current.attendees,
      sessions: nextSessions,
    }
  })
}

/**
 * Returns a mock cb for booking or waiting list request.
 * When executed, it will update the state of the app after `bookingDelay` seconds.
 * It will update the state to match the requested changes, unless the mockData was updated with
 * an alert in the interim (to help with testing an error that might arise when booking)
 * @param {Function} setMockData
 * @param {Object} options
 * @param {number} options.bookingDelay
 * @param {boolean} options.isBookingCb - true if booking request, false if waiting list request
 * @param {boolean | string} options.reject - if defined, the request cb will throw an error. If `reject` is string, will be used
 * as content of error.
 * @return {Function<Promise>} - resolves if the booking completed, throws if it did not
 */
export const useMockBookingCB = (setMockData, options = {}) => {
  const { isBookingCb = true, bookingDelay = 0, reject = false } = options
  const [valid] = validate(
    { setMockData },
    {
      setMockData: isFunc,
      isBookingCb: isBool,
      bookingDelay: delay => isNum(delay) || isStr(delay),
      reject: rej => isBool(rej) || isStr(rej),
    }
  )
  if (!valid) return null

  // callback
  return (sessionId, attendeeIds) => {
    const [valid] = validate(
      { sessionId, attendeeIds },
      { sessionId: isStr, attendeeIds: isArr }
    )
    if (!valid) return Promise.reject()

    return new Promise((resolvePromise, rejectPromise) => {
      // if < 0, indicates the request should not resolve/complete
      if (bookingDelay < 0) return

      // simulate a props-change after the booking-request cb would
      // have updated attendees in consumer's context
      setTimeout(() => {
        !reject &&
          updateMockState(setMockData, sessionId, attendeeIds, isBookingCb)
        const errorMsg = isStr(reject)
          ? reject
          : 'Sorry, we encountered technical difficulties, so we could not book your attendees.'
        reject ? rejectPromise(new Error(errorMsg)) : resolvePromise()
      }, bookingDelay)
    })
  }
}

/**
 * Returns a function that can handle booking requests and will updated the mock input to the sessions component.
 * This is only relevant to DEVELOPMENT. It is not included in production builds.
 */
export const useMockBookingRequest = (setMockData, { bookingDelay = 0 }) =>
  useMockBookingCB(setMockData, {
    isBookingCb: true,
    reject: getURLParam('reject'),
    bookingDelay,
  })

/**
 * Returns a function that can handle waiting list requests and will updated the mock input to the sessions component.
 * This is only relevant to DEVELOPMENT. It is not included in production builds.
 */
export const useMockWaitingRequest = (setMockData, { bookingDelay = 0 }) =>
  useMockBookingCB(setMockData, {
    isBookingCb: false,
    reject: getURLParam('reject'),
    bookingDelay,
  })
