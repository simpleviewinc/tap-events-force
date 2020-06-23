import { deepFreeze } from 'jsutils'

/**
 * Constant values
 * @typedef Values
 * @type {object}
 * @property {{
 *  EVENTS: 'events',
 *  SESSIONS: 'sessions',
 *  FILTERS: 'filters',
 *  ACTIVE_SESSION: 'activeSession',
 *  BOOKING: 'booking',
 *  ATTENDEES: 'attendees',
 *  PRESENTERS: 'presenters',
 *  SETTINGS: 'settings',
 *  LABELS: 'labels',
 *  LOCATIONS: 'locations'
 * }} CATEGORIES
 * @property {{PERSON: 'person: 'group'}} BOOKING_TYPES
 * @property {{AGENDA_SETTINGS: 'agendaSettings'}} SUB_CATEGORIES
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
