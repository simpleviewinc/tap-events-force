import { deepFreeze } from 'jsutils'

/**
 * Constant values
 * @typedef Values
 * @type {object}
 * @property {{EVENTS, SESSIONS, FILTERS, ACTIVE_SESSION, BOOKING}} CATEGORIES
 * @property {{PERSON, GROUP}} BOOKING_TYPES
 */
/** @type {Values} */
export const Values = deepFreeze({
  CATEGORIES: {
    EVENTS: 'events',
    SESSIONS: 'sessions',
    FILTERS: 'filters',
    ACTIVE_SESSION: 'activeSession',
    BOOKING: 'booking',
  },

  BOOKING_TYPES: {
    PERSON: 'person',
    GROUP: 'group',
  },
})
