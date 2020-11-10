import { addAlertModal } from 'SVActions/modals/addAlertModal'
import { setPendingSession } from 'SVActions/session/pending/setPendingSession'
import { clearPendingSession } from 'SVActions/session/pending/clearPendingSession'
import {
  validate,
  isFunc,
  isObj,
  isArr,
  isStr,
  isEmpty,
} from '@keg-hub/jsutils'

const isValidAttendeeList = list => !list || isArr(list)

/**
 * Validates input of `handleAttendeeRequest`
 * @param {Function} requestCb
 * @param {string} sessionId
 * @param {Array<string>} attendeeIds
 * @return {boolean} true if valid input
 */
const isValidInput = (
  bookRequestCb,
  waitRequestCb,
  sessionId,
  bookList,
  waitList
) => {
  const [valid] = validate(
    {
      bookRequestCb,
      waitRequestCb,
      sessionId,
      bookList,
      waitList,
    },
    {
      bookRequestCb: isFunc,
      waitRequestCb: isFunc,
      sessionId: isStr,
      bookList: isValidAttendeeList,
      waitList: isValidAttendeeList,
    }
  )
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
 * @param {Function} requestCb
 * @param {string} sessionId
 * @param {Array<string>} attendeeIds
 * @return {Promise} - promise that resolves when both requests are complete
 */
export const handleAttendeeRequest = async (
  bookRequestCb,
  waitRequestCb,
  sessionId,
  bookList,
  waitList
) => {
  if (
    !isValidInput(bookRequestCb, waitRequestCb, sessionId, bookList, waitList)
  )
    return

  // set the session identified by `sessionId` to "pending" state
  setPendingSession(sessionId)

  let error = null

  // make both requests in tandem
  return (
    Promise.all([
      bookList && bookRequestCb(sessionId, bookList),
      waitList && waitRequestCb(sessionId, waitList),
    ])
      // parse exceptions if either request throws
      .catch(e => {
        error = parseException(e)
      })
      // ensure the pending session is always cleared,
      // and the alert modal is shown if an exception was raised
      .finally(() => {
        clearPendingSession()
        error && addAlertModal(...error)
      })
  )
}
