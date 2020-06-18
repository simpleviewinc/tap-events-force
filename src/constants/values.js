import { keyMap, deepFreeze } from 'jsutils'

/**
 * Constant values
 * @typedef Values
 * @type {object}
 * @property {object} CATEGORIES
 * @property {object} BOOKING_TYPES
 */
/** @type {Values} */
export const Values = deepFreeze({
  CATEGORIES: keyMap([
    'EVENTS',
    'SESSIONS',
    'FILTERS',
    'ACTIVE_SESSION',
    'BOOKING',
  ]),

  BOOKING_TYPES: keyMap([ 'PERSON', 'GROUP', 'UNDEFINED' ]),
})
