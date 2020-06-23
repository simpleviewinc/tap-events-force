import { deepFreeze } from 'jsutils'

/**
 * Constant values
 * @typedef Values
 * @type {object}
 * @property {{
 *  EVENTS,
 *  SESSIONS,
 *  FILTERS,
 *  ACTIVE_SESSION,
 *  BOOKING,
 *  ATTENDEES,
 *  PRESENTERS,
 *  SETTINGS,
 *  LABELS,
 *  LOCATIONS
 * }} CATEGORIES
 * @property {{PERSON, GROUP}} BOOKING_TYPES
 * @property {{AGENDA_SETTINGS}} SUB_CATEGORIES
 */
/** @type {Values} */
export const Values = deepFreeze({
  CATEGORIES: {
    EVENTS: 'events',
    SESSIONS: 'sessions',
    FILTERS: 'filters',
    ACTIVE_SESSION: 'activeSession',
    BOOKING: 'booking',
    ATTENDEES: 'attendees',
    PRESENTERS: 'presenters',
    SETTINGS: 'settings',
    LABELS: 'labels',
    LOCATIONS: 'locations',
  },

  SUB_CATEGORIES: {
    AGENDA_SETTINGS: 'agendaSettings',
  },

  BOOKING_TYPES: {
    PERSON: 'person',
    GROUP: 'group',
  },
})
