import { deepFreeze } from 'jsutils'

/**
 * location object
 * @typedef location
 * @type {object}
 * @property {string} identifier
 * @property {string} name
 */
/** @type {location} */
export const location = deepFreeze({
  identifier: '',
  name: '',
})
