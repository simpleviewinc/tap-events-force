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
const isValidInput = (requestCb, sessionId, attendeeIds) => {
  const [valid] = validate(
    { requestCb, sessionId, attendeeIds },
    {
      requestCb: isFunc,
      sessionId: isStr,
      attendeeIds: isArr,
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
  requestCb,
  sessionId,
  attendeeIds
) => {
  if (!isValidInput(requestCb, sessionId, attendeeIds)) return

  try {
    setPendingSession(sessionId)
    await requestCb(sessionId, attendeeIds)
  }
  catch (e) {
    const [ title, message ] = parseException(e)
    addAlertModal(title, message)
  }
  finally {
    clearPendingSession()
  }
}
