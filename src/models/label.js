import { deepFreeze } from 'jsutils'

/**
 * label object
 * @typedef label
 * @type {object}
 * @property {string} identifier
 * @property {string} name
 * @property {string} className
 */
/** @type {label} */
export const label = deepFreeze({
  identifier: '',
  name: '',
  className: '',
})
