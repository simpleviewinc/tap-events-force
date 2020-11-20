import { useCallback } from 'react'
import { sessionBookingRequest } from 'SVActions/session/booking'
import { validate, isObj, noOp } from '@keg-hub/jsutils'

/**
 * Returns a callback that, given an attendee id, updates the list
 * (either adding to or removing from the attendees booking list or attendees waiting list)
 * in addition to updating the session's current capacity
 * @param {Object} session - current session to book attendees with
 * @param {Object} waitingList - attendee waiting list
 * @param {Object} bookingList - attendee booking list
 * @returns {Function} - callback that will submit the current booking and waiting lists to the consumer
 */
export const useBookSessionCallback = (session, bookingList, waitingList) => {
  const [valid] = validate({ session }, { session: isObj })
  if (!valid) return noOp

  const waitingListIsAvailable = session?.capacity?.isWaitingListAvailable
  // makes a request to book the session for the selected attendees (as identified by ids in `attendeeIdsRef`)
  return useCallback(() => {
    sessionBookingRequest(
      session.identifier,
      bookingList,
      waitingListIsAvailable && waitingList
    )
  }, [ session.identifier, bookingList, waitingListIsAvailable, waitingList ])
}
