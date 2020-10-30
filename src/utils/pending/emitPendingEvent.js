import { Values } from 'SVConstants'
import { getEventEmitter } from 'SVUtils/events/event_emitter'
import { getStore } from 'SVStore'
const { CATEGORIES, EVENTS } = Values

const eventManager = getEventEmitter()

/**
 * Notifies pending session event observers of an update
 * @param {Object} nextPendingSession
 */
export const emitPendingEvent = nextPendingSession => {
  const currentPendingSession = getStore()?.getState()?.items[
    CATEGORIES.PENDING_SESSION
  ]

  eventManager.emit(EVENTS.SESSION_PENDING_UPDATE, {
    current: currentPendingSession,
    next: nextPendingSession,
  })
}
