import { addAlertModal } from 'SVActions/modals/addAlertModal'
import { setPendingSession } from 'SVActions/session/pending/setPendingSession'
import { clearPendingSession } from 'SVActions/session/pending/clearPendingSession'
import { validate, isFunc, isObj, isStr, isEmpty, noOp } from '@keg-hub/jsutils'

/**
 * Validates input of `handleAttendeeRequest`
 * @param {Object} params - params of handleAttendeeRequest
 * @return {boolean} true if valid input
 */
const isValidInput = (params = {}) => {
  const [valid] = validate(params, {
    $default: promise => !promise || promise instanceof Promise,
    onComplete: isFunc,
    sessionId: isStr,
  })
  return valid
}

/**
 * Parses an error thrown by the consumer's request callback
 * @param {(Error | string | Object)?} exception
 * @return {Array} - [ title, message ]
 */
const parseException = exception => {
  const message =
    isStr(exception) && !isEmpty(exception)
      ? exception
      : isObj(exception)
        ? exception.message
        : null

  return [
    'Error',
    message || "We're sorry; something went wrong. Please try again.",
  ]
}

/**
 * Makes the booking and wait-list async requests, handling any errors that may be thrown,
 * as well as updating the pending session state. Does not call a request
 * if its associated list is falsy.
 * @param {Promise} bookRequest
 * @param {Promise} waitRequest
 * @param {Function} onComplete
 * @param {string} sessionId
 * @return {Promise} - promise that resolves when both requests are complete
 */
export const handleBookingRequests = async (
  bookRequest,
  waitRequest,
  onComplete = noOp,
  sessionId
) => {
  if (!isValidInput({ bookRequest, waitRequest, onComplete, sessionId }))
    return Promise.reject('Bad input')

  // set the session identified by `sessionId` to "pending" state
  setPendingSession(sessionId)

  let error = null

  // make both requests in tandem
  return (
    Promise.all([ bookRequest, waitRequest ])
      // parse exceptions if either request throws
      // and enable the alert modal if an exception was raised
      .catch(e => {
        error = parseException(e)
      })
      // ensure the pending session is always cleared,
      .finally(() => {
        onComplete()
        error && addAlertModal(...error)
        clearPendingSession()
      })
  )
}
