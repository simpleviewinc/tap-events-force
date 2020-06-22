import { deepFreeze } from 'jsutils'

/**
 * Constant values
 * @typedef Values
 * @type {object}
 * @property {object} CATEGORIES
 * @property {object} BOOKING_TYPES
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
