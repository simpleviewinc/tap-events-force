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
      bookList: isArr,
      waitList: list => !list || isArr(list),
    }
  )
  return valid
}

/**
 * Parses an error thrown by the consumer's request callback
 * @param {Error?} exception
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
 *
 * @param {Function} requestCb
 * @param {string} sessionId
 * @param {Array<string>} attendeeIds
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

  try {
    setPendingSession(sessionId)
    return await Promise.all([
      bookRequestCb(sessionId, bookList),
      waitRequestCb(sessionId, waitList),
    ])
  }
  catch (e) {
    const [ title, message ] = parseException(e)
    addAlertModal(title, message)
  }
  finally {
    clearPendingSession()
  }
}
