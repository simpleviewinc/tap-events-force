import { deepFreeze } from '@ltipton/jsutils'

/**
 * Constant values
 */
export const Values = deepFreeze({
  CATEGORIES: {
    EVENTS: 'events',
    SESSIONS: 'sessions',
    FILTERS: 'filters',
    ACTIVE_SESSION: 'activeSession',
    AGENDA_SESSIONS: 'agendaSessions',
    BOOKING: 'booking',
    AGENDA_DAYS: 'agendaDays',
    ATTENDEES: 'attendees',
    PRESENTERS: 'presenters',
    SETTINGS: 'settings',
    LABELS: 'labels',
    LOCATIONS: 'locations',
    MODALS: 'modals',
  },

  SUB_CATEGORIES: {
    AGENDA_SETTINGS: 'agendaSettings',
    ACTIVE_FILTERS: 'activeFilters',
    SELECTED_FILTERS: 'selectedFilters',
  },

  MODAL_TYPES: {
    ERROR: 'error',
    PRESENTER: 'presenter',
    FILTER: 'filter',
  },

  BOOKING_TYPES: {
    PERSON: 'person',
    GROUP: 'group',
  },
})
