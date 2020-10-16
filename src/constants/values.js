import { deepFreeze } from '@keg-hub/jsutils'

/**
 * Constant values
 */
export const Values = deepFreeze({
  CATEGORIES: {
    ACTIVE_SESSION: 'activeSession',
    AGENDA_SESSIONS: 'agendaSessions',
    ATTENDEES_BY_TICKET: 'attendeesByTicket',
    RESTRICTED_ATTENDEE_IDS: 'restrictedAttendeeIds',
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
    ALERT: 'alert',
    BOOKED_TICKETS: 'bookedTickets',
    TICKETS: 'tickets',
    GROUP_BOOKING: 'groupBooking',
    DISPLAY_PROPERTIES: 'displayProperties'
  },

  SUB_CATEGORIES: {
    AGENDA_SETTINGS: 'agendaSettings',
    ACTIVE_FILTERS: 'activeFilters',
    SELECTED_FILTERS: 'selectedFilters',

    // group booking
    BOOKING_LIST: 'bookingList',
    WAITING_LIST: 'waitingList',
    SESSION_CAPACITY: 'capacity',
    CURRENT_SESSION: 'currentSession',
  },

  MODAL_TYPES: {
    ALERT: 'alert',
    PRESENTER: 'presenter',
    FILTER: 'filter',
    GROUP_BOOKING: 'groupBooking',
    SESSION_DETAILS: 'sessionDetails',
  },

  SESSION_BOOKING_STATES: {
    AVAILABLE: 'available',
    SELECTED: 'selected',
    WAITING_LIST: 'waiting list',
    ON_WAITING_LIST: 'on waiting list',
    FULLY_BOOKED: 'fully booked',
    READ_ONLY: 'read only',
  },

  TICKET_TYPE: {
    PERSON: 'person',
    GROUP: 'group',
    ITEM: 'item',
  },
  EVENTS: {
    SESSION_BOOKING_REQUEST: 'sessionBookingRequest',
    SESSION_WAITING_LIST_REQUEST: 'sessionWaitingListRequest',
  },
  TICKET_TYPES: {
    GROUP: 'group',
    PERSON: 'person',
    ITEM: 'item',
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
