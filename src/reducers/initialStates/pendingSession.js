import { Values } from 'SVConstants'
const { CATEGORIES } = Values

/**
 * pending sessions state
 */
export const pendingSessionState = {
  [CATEGORIES.PENDING_SESSION]: {
    identifier: undefined,
    pendingBookingList: undefined,
    pendingWaitingList: undefined,
  },
}
