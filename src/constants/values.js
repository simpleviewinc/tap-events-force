import { deepFreeze } from '@keg-hub/jsutils'

// categories set by the props
const EVF_CATEGORIES = {
  AGENDA_DAYS: 'agendaDays',
  BOOKING: 'booking',
  ATTENDEES: 'attendees',
  LABELS: 'labels',
  LOCATIONS: 'locations',
  PRESENTERS: 'presenters',
  SESSIONS: 'sessions',
  BOOKED_TICKETS: 'bookedTickets',
  TICKETS: 'tickets',
  ALERT: 'alert',
}

// categories set internally, not by exposed props
const INTERNAL_CATEGORIES = {
  FILTERS: 'filters',
  ACTIVE_SESSION: 'activeSession',
  PENDING_SESSION: 'pendingSession',
  AGENDA_SESSIONS: 'agendaSessions',
  ATTENDEES_BY_TICKET: 'attendeesByTicket',
  RESTRICTED_ATTENDEE_IDS: 'restrictedAttendeeIds',
  MODALS: 'modals',
  SETTINGS: 'settings',
  DISPLAY_PROPERTIES: 'displayProperties',
}

/**
 * Constant values
 */
export const Values = deepFreeze({
  EVF_CATEGORIES,
  INTERNAL_CATEGORIES,
  CATEGORIES: {
    ...EVF_CATEGORIES,
    ...INTERNAL_CATEGORIES,
  },
  SUB_CATEGORIES: {
    AGENDA_SETTINGS: 'agendaSettings',
    ACTIVE_FILTERS: 'activeFilters',
    SELECTED_FILTERS: 'selectedFilters',
    WAITING_LIST_ACTIVE: 'waitingListActive',
  },

  MODAL_TYPES: {
    ALERT: 'alert',
    PRESENTER: 'presenter',
    FILTER: 'filter',
    GROUP_BOOKING: 'groupBooking',
    SESSION_DETAILS: 'sessionDetails',
  },

  BUTTON_TYPES: {
    SELECT_SESSION: 'selectSession',
    MODAL_PRIMARY: 'modalPrimary',
    MODAL_SECONDARY: 'modalSecondary',
  },

  BOOKING_MODES: {
    SINGLE: 'single',
    GROUP: 'group',
  },

  SESSION_BOOKING_STATES: {
    SELECT: 'select',
    SELECTED: 'selected',
    WAITING_LIST: 'waiting list',
    ON_WAITING_LIST: 'on waiting list',
    FULLY_BOOKED: 'fully booked',
    READ_ONLY: 'read only',
  },
  SESSION_BOOKING_LABEL_MAP: {
    SELECT: 'Available',
  },
  BOOKING_STATES_WITH_ICON: {
    selected: true,
    'on waiting list': true,
  },
  BOOKING_STATES_WITH_ALT_TEXT: {
    'read only': '',
  },

  TICKET_TYPE: {
    PERSON: 'person',
    GROUP: 'group',
    ITEM: 'item',
  },
  EVENTS: {
    SESSION_BOOKING_REQUEST: 'sessionBookingRequest',
    SESSION_WAITING_LIST_REQUEST: 'sessionWaitingListRequest',
    SESSION_PENDING_UPDATE: 'sessionPendingUpdate',
  },
  TICKET_TYPES: {
    GROUP: 'group',
    PERSON: 'person',
    ITEM: 'item',
  },
  ERROR_MESSAGES: {
    DEFAULT: "We're sorry; something went wrong. Please try again.",
    INTERNAL:
      'Oh no! An internal problem has prevented us from completing your request. Please try again later when we have fixed it.',
  },
  /**
   * Local storage keys used to identify the values to load from local storage, if present.
   * Should follow the form: <category>.<key>.<properties (optional)>, where category and
   * key refer to the category and key of the items store in which the value resides.
   *
   * On init these will be loaded into the items store tree with the specified category and key.
   */
  LOCAL_STORAGE_KEYS: [],
})
