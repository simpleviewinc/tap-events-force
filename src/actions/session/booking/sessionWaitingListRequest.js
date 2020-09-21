import { Values } from 'SVConstants'
import { getEventEmitter } from 'SVUtils'

const { EVENTS } = Values
const kegEventEmitter = getEventEmitter()

/**
 * Fires the event for the sessionWaitingList request, ultimately calling
 * the callback passed to the root `Session` component with the session id
 * and attendeeIds to be put on the session's waiting list
 * @param {string} sessionId
 * @param {Array<string>} attendeeIds - array of ids for attendeees, each of which will be put on the waiting list for this session
 */
export const sessionWaitingListRequest = (sessionId, attendeeIds = []) => {
  const valid = kegEventEmitter.emit(
    EVENTS.SESSION_WAITING_LIST_REQUEST,
    sessionId,
    attendeeIds
  )
  if (!valid)
    console.warn(
      `Callback for ${EVENTS.SESSION_WAITING_LIST_REQUEST} does not exist!`
    )
  else
    console.log(
      'Emitted event',
      EVENTS.SESSION_WAITING_LIST_REQUEST,
      sessionId,
      attendeeIds
    )
}
