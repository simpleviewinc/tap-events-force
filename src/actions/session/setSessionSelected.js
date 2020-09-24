import { Values } from 'SVConstants'
import { getStore } from 'SVStore'
import { addModal } from 'SVActions/modals'
import { Modal } from 'SVModels/modal'
import { sessionBookingRequest } from 'SVActions/session/booking/sessionBookingRequest'

const { MODAL_TYPES } = Values

/**
 * Either books the current session or opens up group booking modal
 * based on the # of attendees available
 * @param {import('SVModels/session').Session} session
 */
export const setSessionSelected = session => {
  if (!session) return

  const { items } = getStore()?.getState()
  const attendeesCp = items && Array.from(items.attendees)

  // many attendees, open group booking modal
  // single attendee, just book it
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
    : sessionBookingRequest(session.identifier, [
        attendeesCp[0]?.bookedTicketIdentifier,
    ])
}
