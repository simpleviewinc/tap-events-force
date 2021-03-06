import { showAlertModal } from 'SVActions/modals/showAlertModal'
import { setPendingSession } from 'SVActions/session/pending/setPendingSession'
import { clearPendingSession } from 'SVActions/session/pending/clearPendingSession'
import { validate, isFunc, isStr, parseErrorMessage } from '@keg-hub/jsutils'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'
import { Values } from 'SVConstants'

const { ERROR_MESSAGES } = Values

/**
 * Validates input of `handleAttendeeRequest`
 * @param {Object} params - params of handleAttendeeRequest
 * @return {boolean} true if valid input
 */
const isValidInput = (params = {}) => {
  const [valid] = validate(params, {
    $default: isFunc,
    sessionId: isStr,
  })
  return valid
}

/**
 * Handles an error on a failed booking request,
 * parsing the error and showing an alert modal with its
 * contents
 * @param {Object | string} error - error from async request
 */
const handleError = error => {
  const message = parseErrorMessage(error) || ERROR_MESSAGES.DEFAULT
  showAlertModal(message)
}

/**
 * Makes the booking and wait-list async requests, handling any errors that may be thrown,
 * as well as updating the pending session state. Does not call a request
 * if its associated list is falsy.
 * @param {Function<Promise>} bookRequest
 * @param {Function<Promise>} waitRequest
 * @param {string} sessionId
 * @return {Void}
 */
export const handleBookingRequests = async (
  bookRequest,
  waitRequest,
  sessionId
) => {
  if (!isValidInput({ bookRequest, waitRequest, sessionId }))
    return showAlertModal(ERROR_MESSAGES.INTERNAL)

  // set the session identified by `sessionId` to "pending" state,
  // temporarily disabling all booking buttons and showing a spinner
  // for the booking button associated with the session id
  setPendingSession(sessionId)

  // make both requests in tandem
  Promise.all([ bookRequest(), waitRequest() ])
    .then(hideActiveModal)
    .catch(handleError)
    .finally(clearPendingSession)
}
