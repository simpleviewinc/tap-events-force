import { Values } from 'SVConstants'
import { getStore } from 'SVStore'
import { addModal } from 'SVActions/modals'
import { Modal } from 'SVModels/modal'
import { sessionBookingRequest } from 'SVActions/session/booking/sessionBookingRequest'

const { MODAL_TYPES } = Values

/**
 *
 * @param {import('SVModels/session').Session} session
 */
export const setSessionSelected = session => {
  if (!session) return

  const { items } = getStore()?.getState()
  const attendeesCp = items && Array.from(items.attendees)

  if (attendeesCp.length > 1) {
    // open group booking
    addModal(
      new Modal({
        type: MODAL_TYPES.GROUP_BOOKING,
        data: {
          session,
          attendees: attendeesCp,
        },
      })
    )
  }
  else {
    // single booking, just book it
    // TODO: this needs to be updated once sessionBookingRequest method is done
    sessionBookingRequest()
  }
}
