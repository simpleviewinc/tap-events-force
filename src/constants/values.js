import { deepFreeze } from '@keg-hub/jsutils'

/**
 * Constant values
 */
export const Values = deepFreeze({
  CATEGORIES: {
    ACTIVE_SESSION: 'activeSession',
    AGENDA_SESSIONS: 'agendaSessions',
    BOOKING: 'booking',
    AGENDA_DAYS: 'agendaDays',
    ATTENDEES: 'attendees',
    EVENTS: 'events',
    FILTERS: 'filters',
    LABELS: 'labels',
    LOCATIONS: 'locations',
    MODALS: 'modals',
    PRESENTERS: 'presenters',
    SESSIONS: 'sessions',
    SETTINGS: 'settings',
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
    GROUP_BOOKING: 'groupBooking',
  },

  BOOKING_TYPES: {
    PERSON: 'person',
    GROUP: 'group',
  },
  EVENT_LISTENERS: {
    SESSION_BOOKING_REQUEST: 'sessionBookingRequest',
  },
  /**
   * Local storage keys used to identify the values to load from local storage, if present.
   * Should follow the form: <category>.<key>.<properties (optional)>, where category and
   * key refer to the category and key of the items store in which the value resides.
   *
   * On init these will be loaded into the items store tree with the specified category and key.
   */
  LOCAL_STORAGE_KEYS: ['settings.agendaSettings.activeDayNumber'],
})
