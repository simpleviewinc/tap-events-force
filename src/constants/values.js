import { keyMap } from 'jsutils'

export const Values = {
  categories: keyMap([
    'events',
    'sessions',
    'filters',
    'activeSession',
    'booking',
  ]),

  bookingTypes: keyMap([ 'person', 'group', 'undefined' ]),
}
