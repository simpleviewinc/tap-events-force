import { showAlertModal } from 'SVActions/modals/showAlertModal'
import { setPendingSession } from 'SVActions/session/pending/setPendingSession'
import { clearPendingSession } from 'SVActions/session/pending/clearPendingSession'
import { validate, isFunc, isObj, isStr, isEmpty } from '@keg-hub/jsutils'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'

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
 * Handles an error on a failed booking request,
 * parsing the error and showing an alert modal with its
 * contents
 * @param {Object | string} error - error from async request
 */
const handleError = error => {
  const [ title, message ] = parseException(error)
  showAlertModal(title, message)
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
  sessionId
) => {
  if (!isValidInput({ bookRequest, waitRequest, sessionId }))
    return Promise.reject('Bad input')

  // set the session identified by `sessionId` to "pending" state,
  // temporarily disabling all booking buttons and showing a spinner
  // for the booking button associated with the session id
  setPendingSession(sessionId)

  // make both requests in tandem
  return Promise.all([ bookRequest, waitRequest ])
    .then(hideActiveModal)
    .catch(handleError)
    .finally(clearPendingSession)
}
