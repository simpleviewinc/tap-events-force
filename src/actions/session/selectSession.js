import { Values } from 'SVConstants'
import { getStore } from 'SVStore'
import { addModal } from 'SVActions/modals'
import { Modal } from 'SVModels/modal'
import { sessionBookingRequest } from 'SVActions/session/booking/sessionBookingRequest'
import { sessionWaitingListRequest } from 'SVActions/session/booking/sessionWaitingListRequest'
import { devLog } from 'SVUtils/logs'
import { checkCall, isArr } from '@keg-hub/jsutils'

const { EVENTS, MODAL_TYPES } = Values
const bookingActions = { sessionBookingRequest, sessionWaitingListRequest }

/**
 * Either books the current session or opens up group booking modal
 * based on the # of attendees available
 * @param {import('SVModels/session').Session} session
 * @param {Array} attendees - Group of attendee ids to book for a session
 * @param {string} actionType - Type of booking action to call
 */
export const selectSession = (
  session,
  attendees,
  actionType = EVENTS.SESSION_BOOKING_REQUEST
) => {
  if (!session)
    return devLog.warn(
      'Action "selectSession" requires a valid session. Received: ',
      session
    )

  // Check if there is an attendees override, and use that instead of the stored attendees
  const attendeesCp = isArr(attendees)
    ? attendees
    : checkCall(() => {
      const { items } = getStore()?.getState()
      return items && Array.from(items.attendees)
    })

  // If more then 1 attendee, open group booking modal
  // Otherwise get an array of the attendee ids
  attendeesCp.length > 1
    ? addModal(
        new Modal({
          type: MODAL_TYPES.GROUP_BOOKING,
          data: {
            session,
            attendees: attendeesCp,
          },
        })
      )
    : checkCall(
      bookingActions[actionType],
      session.identifier,
      attendeesCp.map(attendee => attendee?.bookedTicketIdentifier)
    )
}
