import { deepFreeze } from 'jsutils'

/**
 * price object
 * @typedef price
 * @type {object}
 * @property {string} currency - ISO 4217
 * @property {number} amount
 */
/** @type {price} */
export const price = deepFreeze({
  currency: '',
  amount: 0,
})
