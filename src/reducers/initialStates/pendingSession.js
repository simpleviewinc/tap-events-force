import { PendingSession } from 'SVModels/session/pendingSession'
import { Values } from 'SVConstants'
const { CATEGORIES } = Values

/**
 * pending sessions state
 */
export const pendingSessionState = {
  [CATEGORIES.PENDING_SESSION]: new PendingSession(),
}
